const express=require('express')
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const routes=express.Router();
const Item=require('../Model/Additems_schema');
const {contributedelete,contributeupdate}=require('../Controller/Contribute')
routes.get('/Contribute', async (req, res) => {
    try {
        const userCookie = req.cookies.user;
        const userdata = JSON.parse(decodeURIComponent(userCookie));
        const userid = userdata._id;
        const items = await Item.find({ userId: userid });
        if (items.length > 0)
            res.render('Contribute', { items: items, state: true, success: null, error: null });
        else
            res.render('Contribute', { items: items, state: false, error: null });
    }
    catch (err) {
        console.log("error found in contribute page=" + err);
        // res.status(500).send("Internal Server Error");
    }
});
routes.post('/Contribute/Update',upload.single('Updatedfile'),contributeupdate)
routes.post('/Contribute/delete',contributedelete)
module.exports=routes;
