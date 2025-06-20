const express = require('express')

const routes = express.Router();
const authroute=require('../Routes/authroute');
const additemsroute=require('../Routes/Additemsroute');
const cartroute=require('../Routes/cartroute');
const contributeroute=require('../Routes/contributeroute');
const productroute=require('../Routes/productroute');
const profileroute=require('../Routes/profileroute');


routes.use('/',authroute)
routes.use('/',productroute)
routes.use('/',cartroute)
routes.use('/',additemsroute)
routes.use('/',profileroute)
routes.use('/',contributeroute)
routes.get('/', (req, res) => {
    res.render('Home', { success: null })
})
module.exports=routes;