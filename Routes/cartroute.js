const express=require('express');
const routes=express.Router();
const {cartstore,cartremove}=require('../Controller/Cart')
const Cartschema=require('../Model/Cart_schema');
routes.get('/Cart', async (req, res) => {
    try {
        const userCookie = req.cookies.user;    
        const userData = JSON.parse(decodeURIComponent(userCookie));
        const userId = userData._id;
        const items = await Cartschema.find({ userId: userId }).populate('productid');
        console.log(items)
        if (items.length > 0) {
            res.render('Cart', { Items: items, state: true });
        }
        return res.render('Cart', { Items: null, state: false })
    } catch (err) {
        console.log("ERROR THROUGHT THE CART PAGE="+err);
    }
})
routes.post('/Cart',cartstore);
routes.post('/Cart/remove',cartremove);
module.exports=routes;