const express=require('express');
const routes=express.Router();
const {userregistration,userlogin}=require('../Controller/UserRegistration')
routes.get('/Login', (req, res) => {
    res.render('Login', { success: null, error: null })
})
routes.get('/Signup', (req, res) => {
    res.render('Signup', { error: null })
})
routes.get('/Logout', (req, res) => {
    res.clearCookie('user')
    const success = "Logout successfully."
    res.render('Home', { success: success });
})
routes.post('/Signup',userregistration);
routes.post('/Login',userlogin);
module.exports=routes;