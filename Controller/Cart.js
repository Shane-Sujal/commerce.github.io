const Cart_schema=require('../Model/Cart_schema');
const Item=require('../Model/Additems_schema')
const {createtransport,sendemail}=require('../Mailservice/Mailer')
const cartstore=(async (req, res) => {
    try {
        const userCookie = req.cookies.user;
        const productId = req.query.productid;
        console.log(productId);
        const quantity = req.body.Quantity;
        if (!userCookie) {
            return res.render('Login', { message: 'Please login!' });
        }
        const userData = JSON.parse(decodeURIComponent(userCookie));
        const userId = userData._id;

        // Fetch the item based on the productId
        const item = await Item.findById(productId).populate('userId');
        if (!item) {
            return res.status(404).send('Product not found.');
        }

        // Check if item quantity is sufficient
        if (item.quantity < quantity|| quantity<=0) {
            const items=await Item.find();
             return res.render('Product',{state:true,Items:items,success:null,error:'Your demand is out of quantity'})
        }
        
        const updatedQuantity = item.quantity - quantity;
        item.quantity = updatedQuantity;
        if(item.quantity<=5){
            const transporter = createtransport();

            // Setup email data
            const mailOptions = {
                from: 'perry.pawan@rubicotech.in', // Sender address
                to: `${item.userId.email}`, // Receiver address
                subject: 'Low Quantity ProductAlert', // Subject line
                text: `Wake up Buddy, The quantity of item "${item.itemName}" is low. Only ${item.quantity} left in stock.` // Plain text body
            };

            // Send email
            await sendemail(transporter, mailOptions);
        }

        // Update item quantity in the database

        await item.save();

        // Add the item to the user's cart
        const newCartItem = new Cart_schema({ userId:userId, productid:productId, quantity:quantity});
        await newCartItem.save();

        const items=await Item.find();
        res.render('Product', { success: 'Added to cart.', state: true, Items: items,error:null });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

const cartremove=( async (req, res) => {
    try {
        const userCookie = req.cookies.user;
        const productid = req.query.productid;
        if (!userCookie) {
            return res.redirect('/');
        }
        const userdata = JSON.parse(decodeURIComponent(userCookie));
        const userid = userdata._id;
        if (userid) {
            await Cart_schema.findOneAndDelete({ _id: productid }); // Corrected this line
            console.log('Item deleted from the Cart');
            return res.redirect('/Cart');
        }
    }
    catch (err) {
        console.log('error found while deleting=' + err);
        res.status(500).send('Error deleting item from cart');
    }
});
module.exports={
    cartstore,
    cartremove,
}