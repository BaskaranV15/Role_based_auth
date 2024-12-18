// const bcrypt = require('bcryptjs');
// const User=require('../models/userModel');
// const saltNum=12;
// const register =async(req,res)=>
// {
//     try{
//         const {username,password,role} = req.body;
//         const hashedPassword = await bcrypt.hash(password,saltNum);

//         // create a new user
//         const newUSer=new User({username:username,password:hashedPassword,role:role});
//         await newUSer.save();
//         res.status(201).json({message:`${role} register with username ${username}`})
//     }catch(err)
//     {
//         res.status(500).json({message:`something went wrong`})
//     }
// };

// const login =async(req,res)=>
// {
//     try{    
//         const{username,password}=req.body;
//         const user=await User.findOne({username});

//         if(!user)
//         {
//             return res.status(404).json(`User with username ${username} not fount`)
//         }

//         // if user matches 
//         const isMatch =await bcrypt.compare(password,user.password);
//         if(!isMatch){
//             return res.status(400).json('Invalid Credentails')
//         }

//         const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SCERET,{expiresIn:"1h"});
//         res.status(200).json({token});
//     }
//     catch(err)
//     {
//         res.status(500).json({message:`something went wrong`})
//     }
// };

// module.exports={register,login};


// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken'); // Ensure this is imported
// const User = require('../models/userModel');
const dotenv =require("dotenv").config()

// Number of salt rounds for hashing passwords
const saltNum = 12;

// Register a new user
const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Validate input
        if (!username || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltNum);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            role
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: `${role} registered with username ${username}` });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Something went wrong during registration' });
    }
};

// Login an existing user
// const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Validate input
//         if (!username || !password) {
//             return res.status(400).json({ message: 'Username and password are required' });
//         }

//         // Find the user
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(404).json({ message: `User with username ${username} not found` });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Get the JWT secret
//         const jwtSecret = process.env.JWT_SECRET;
//         if (!jwtSecret) {
//             console.error('JWT_SECRET is not defined');
//             return res.status(500).json({ message: 'Server error: JWT secret not configured' });
//         }

//         // Generate token
//         const token = jwt.sign(
//             { id: user._id, role: user.role },
//             jwtSecret,
//             { expiresIn: '1h' }
//         );

//         res.status(200).json({
//             message: 'Login successful',
//             token,
//             user: { username: user.username, role: user.role }
//         });
//     } catch (err) {
//         console.error('Error during login:', err);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const login = async (req, res) => {
    try {
        // Destructure and validate request body
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Find user in the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: `User with username ${username} not found` });
        }

        // Compare input password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if JWT secret is defined
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined');
            return res.status(500).json({ message: 'Server configuration error: Missing JWT_SECRET' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role }, // Payload
            jwtSecret,                         // Secret key
            { expiresIn: '7d' }                // Token expiration
        );

        // Send success response with token
        res.status(200).json({
            message: ` Login successful `,
            token,
            user: { username: user.username, role: user.role }
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Something went wrong during login' });
    }
};

console.log('JWT_SECRET:', process.env.JWT_SECRET);

module.exports = { register, login };
