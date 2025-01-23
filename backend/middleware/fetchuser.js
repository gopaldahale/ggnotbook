// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const JWT_SECRET = process.env.JWT_SECRET;

// const fetchuser = async (req, res, next) => {
//     // Get the user from the jwt token and add id to req object
//     const token = req.header('auth-token');
//     if(!token){
//         res.status(401).send({error: "Please authenticate using a valid token"});
//     }
//     try {
//         const data = jwt.verify(token, JWT_SECRET);
//         req.user = data.user;
//         next();
//     } catch (error) {
//         res.status(401).send({error: "Please authenticate using a valid token"});
//     }
// }

// module.exports = fetchuser;


const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;  // Set user information to the request object
        console.log('Authenticated User ID:', req.user.id);  // Log user ID for debugging
        next();  // Pass control to the next middleware
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        res.status(401).send({ error: "Invalid token, please authenticate again" });
    }
};

module.exports = fetchuser;
