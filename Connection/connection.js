const mongoose=require('mongoose');
function connection(url){
mongoose.connect(url)
.then(()=>{
    console.log('DB is connected');
}).catch(err=>{
    console.log('Error found in db='+err);
})
}
module.exports=connection;