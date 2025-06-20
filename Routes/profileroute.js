const express=require('express');
const routes=express.Router();

routes.get('/Profile', (req, res) => {
    res.render('Profile');
})
module.exports=routes