const Item=require('../Model/Additems_schema');
const productsearch=(async (req,res)=>{
    try{
        const category=req.body.Category;
        const items=await Item.find({$text:{$search:category}});
        res.render('Product',{state:true,Items:items,success:null,error:null})
    }
    catch(err){
        console.log(err);
    }
})
module.exports=productsearch;

