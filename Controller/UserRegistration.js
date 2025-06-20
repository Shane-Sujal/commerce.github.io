const express=require('express')
const app=express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const user_schema=require('../Model/User_schema')

// Set cookie expiry time to 1 hour (3600000 milliseconds)
const cookieOptions = {
    maxAge: 3600000,
};
 const userregistration= ( async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await user_schema.findOne({ email });
        if (existingUser) {
            return res.render('Signup', { error: 'User already exists.' });
        }
        const newUser = new user_schema({ username, email, password });
        await newUser.save();
        res.render('Login', { success: 'User registered successfully', error: null });
    } catch (error) {
        console.error('Error creating user:', error);
    }
});

const userlogin=( async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists in the database and validate password
        const existingUser = await user_schema.findOne({ email });
        if (!existingUser) {
            return res.render('Login', { error: 'User does not exist. Please create an account.', success: null });
        }
        if (existingUser.password !== password) {
            return res.render('Login', { error: 'Incorrect password. Please try again.', success: null });
        }
        res.cookie('user', JSON.stringify(existingUser), cookieOptions);
       
        res.render('Home', {
            success: 'User Login successfully',
            error: null,
        });
    } catch (error) {
        console.error('Error in finding user:', error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports={
    userregistration,
    userlogin,
};