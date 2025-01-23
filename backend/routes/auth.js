const express = require('express');
const User = require('../models/UserSchema');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Add this check after the JWT_SECRET declaration
if (!JWT_SECRET) {
    console.error('JWT_SECRET is not set in the environment variables');
    process.exit(1);
}

router.get('/', (req, res) => {
    res.send('Auth route is working!');
});

// Route 1: Create a User using: POST "/api/auth/createuser" . No login require
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let signSuccess = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check wheather the user with this email exist already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            signSuccess = false;
            return res.status(400).json({ signSuccess, error: "Sorry a user with this email already exist" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
        // Create a new user
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
        res.status(500).send("Some error occured");
    }
})

// Route 2: Authenticate a User using: POST "/api/auth/login" . No login require
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let successMsg = false;
    // If there are errors, return Bad request and the errors
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
        // const authToken = jwt.sign(data, JWT_SECRET);
        const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        successMsg = true;
        console.log('user logged in!');
        res.json({ successMsg, authToken });
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occured");
    }
})

// Route 3: Get loggedin User Details using: POST "/api/auth/getuser" . Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occured");
    }
})



module.exports = router;

