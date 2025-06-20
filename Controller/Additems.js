const multer=require('multer')
const Item=require('../Model/Additems_schema')

const additems=( async (req, res) => {
    const { itemName, description, price,quantity, category } = req.body;
    const imageData = req.file.buffer; // Buffer containing image data
    const imageContentType = req.file.mimetype; // Content type of the image
    try {
        // Get user ID from the cookie
        const userCookie = req.cookies.user;
        if (!userCookie) {
            return res.render('Additems', { message: 'Please login!' });
        }

        const userData = JSON.parse(decodeURIComponent(userCookie));
        const userId = userData._id;

        // Create a new item
        const newItem = new Item({
            itemName: itemName,
            description: description,
            price: price,
            quantity:quantity,
            category: category,
            image: {
                data: imageData,
                contentType: imageContentType
            },
            userId: userId // Assign the user's ID to the userId field
        });
        await newItem.save();

        console.log("Item added successfully")
        return res.render('Additems', { message: "Item added successfully." });
    } catch (error) {
        console.error('Error adding item:', error);
        return res.status(500).send('Internal Server Error');
    }
});
module.exports=additems;