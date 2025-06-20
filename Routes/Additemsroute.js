const express=require('express');
const routes=express.Router();
const multer=require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const additems=require('../Controller/Additems')
routes.get('/Additems', (req, res) => {
    res.render('Additems', { message: null })
})
routes.post('/Additems',upload.single('image'),additems)
module.exports=routes;