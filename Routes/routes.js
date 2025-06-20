
// routes.get('/Additems', (req, res) => {
//     res.render('Additems', { message: null })
// })
// routes.get('/Product', async (req, res) => {
//     try {
//         const Items = await Item.find()
//         if (Items.length > 0) {
//             return res.render('Product', { state: true, Items: Items, success: null,error:null })
//         }
//         else {
//             return res.render('Product', { state: false, Items: Items,success:null,error:null })
//         }
//     }
//     catch (err) {
//         console.log("error while fetching data=" + err)
//     }
// });
// routes.get('/Login', (req, res) => {
//     res.render('Login', { success: null, error: null })
// })
// routes.get('/Signup', (req, res) => {
//     res.render('Signup', { error: null })
// })
// routes.get('/Logout', (req, res) => {
//     res.clearCookie('user')
//     const success = "Logout successfully."
//     res.render('Home', { success: success });
// })
// routes.get('/Cart', async (req, res) => {
//     try {
//         const userCookie = req.cookies.user;
//         const userData = JSON.parse(decodeURIComponent(userCookie));
//         const userId = userData._id;
//         const items = await Cartschema.find({ userId: userId }).populate('productid');
//         if (items.length > 0) {
//             res.render('Cart', { Items: items, state: true });
//         }
//         return res.render('Cart', { Items: null, state: false })
//     } catch (err) {
//         console.log(err);
//     }
// })
// routes.get('/Profile', (req, res) => {
//     res.render('Profile');
// })
// routes.get('/Contribute', async (req, res) => {
//     try {
//         const userCookie = req.cookies.user;
//         const userdata = JSON.parse(decodeURIComponent(userCookie));
//         const userid = userdata._id;
//         const items = await Item.find({ userId: userid });
//         if (items.length > 0)
//             res.render('Contribute', { items: items, state: true, success: null, error: null });
//         else
//             res.render('Contribute', { items: items, state: false, error: null });
//     }
//     catch (err) {
//         console.log("error found in contribute page=" + err);
//         // res.status(500).send("Internal Server Error");
//     }
// });

// module.exports = routes;