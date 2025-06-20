const Item=require('../Model/Additems_schema')
const contributeupdate=( async (req, res) => {
    try {
        const userCookie = req.cookies.user;
        const updateid = req.query.Updateid;
        let imageData = null;
        let imageContentType = null;

        if (req.file) {
            imageData = req.file.buffer; // Buffer containing image data
            imageContentType = req.file.mimetype; // Content type of the image
        }

        const { itemName, description, price,quantity, category } = req.body;

        if (!userCookie) {
            return res.redirect('/');
        }

        const userdata = JSON.parse(decodeURIComponent(userCookie));
        const userid = userdata._id;

        let updatedata = {
            itemName, description, price,quantity, category
        };

        if (imageData !== null && imageContentType !== null) {
            updatedata.image = {
                data: imageData,
                contentType: imageContentType,
            };
        }

        await Item.findByIdAndUpdate(updateid, updatedata);

        const items = await Item.find({ userId: userid });
        console.log("Item updated")
        res.render('Contribute', { items: items, success: "Item Updated", state: true, error: null });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
})

const contributedelete=( async (req, res) => {
    try {
        const userCookie = req.cookies.user;
        const deleteid = req.query.deleteinfo;
        const confirmName = req.body.confirmName;
        const Name = req.body.Name;
        if (!userCookie) {
            return res.redirect('/')
        }
        const userdata = JSON.parse(decodeURIComponent(userCookie));
        const userid = userdata._id;
        if (userid) {
            if (confirmName === Name) {
                await Item.findByIdAndDelete({ _id: deleteid });
                console.log("Item Deleted");
                return res.redirect('/Contribute');
            }
            else {
                const items = await Item.find({ userId: userid });
                if (items.length > 0)
                    res.render('Contribute', { items: items, state: true, success: null, error: "ItemName is incorrect" });
                else
                    res.render('Contribute', { items: items, state: false, error: null });
            }
        }
    }
    catch (err) {
        console.log("Error found =" + err)
        res.status(500).send('Error deleting contribute item from the Store.');
    }
})
module.exports={
    contributeupdate,
    contributedelete,
}