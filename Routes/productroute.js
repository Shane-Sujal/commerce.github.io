const express=require('express');
const routes=express.Router();
const Item=require('../Model/Additems_schema');
const productsearch=require('../Controller/Product')
routes.get('/Product', async (req, res) => {
    try {
        const Items = await Item.find()
        if (Items.length > 0) {
            return res.render('Product', { state: true, Items: Items, success: null,error:null })
        }
        else {
            return res.render('Product', { state: false, Items: Items,success:null,error:null })
        }
    }
    catch (err) {
        console.log("error while fetching data=" + err)
    }
});
routes.post('/Product',productsearch
)
module.exports=routes;