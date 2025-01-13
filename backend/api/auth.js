const express = require('express');
const User = require('../models/UserSchema');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error('JWT_SECRET is not set in the environment variables');
    process.exit(1);
}

const app = express();
app.use(express.json()); // Vercel functions need to parse JSON

// Route 1: Create a User using: POST "/api/auth/createuser" . No login required
app.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let signSuccess = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            signSuccess = false;
            return res.status(400).json({ signSuccess, error: "Sorry a user with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        signSuccess = true;
        res.json({ signSuccess, authToken });
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occurred");
    }
});

// Route 2: Authenticate a User using: POST "/api/auth/login" . No login required
app.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let successMsg = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            successMsg = false;
            return res.status(400).json({ successMsg, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            successMsg = false;
            return res.status(400).json({ successMsg, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        successMsg = true;
        res.json({ successMsg, authToken });
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occurred");
    }
});

// Route 3: Get loggedin User Details using: POST "/api/auth/getuser" . Login required
app.post('/getuser', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occurred");
    }
});

module.exports = (req, res) => app(req, res);  // Export as Vercel function
