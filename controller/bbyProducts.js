var express = require('express');
var router = express.Router();
// let db = require('../models');
let axios = require('axios');

                // ROUTES:
// GET /products
// router.get('/', async (req, res) => {
//     // TODO: Get all records from the DB and render to view
//     let products = await db.product.findAll();
//     res.render('product/cart', { products: products });
// });

// GET ROUTE FOR /LOGIN PAGE displays log in form with boolean for matching username/password.
// router.get('/login', (req, res) => {
//     res.send('login.ejs');
// });
// POST ROUTE FOR /LOGING PAGE grabs user input and verifies boolean
// router.post('/', async (req, res) => {
//     // TODO: Get form data and add a new record to DB
//     let product = await db.product.findOrCreate({
//       where: {
//         name: req.body.name
//       }
//     });
//     res.redirect('/product');
//   });

// GET ROUTE FOR /PRODUCTS PAGE

// app.get('/products', function (req, res) {
//     res.send('Hello World!')
//   })

// router.get('/product', (req, res) => {
//     axios.get(`https://api.bestbuy.com/v1/products/8880044.json?apiKey=${BESTBUYAPI}`)
//         .then((resFromAPI) =>{
//             console.log(resFromAPI.data.Title)
//             res.send(resFromAPI.data.Title)
//         })
//         .catch(err => {console.log(err)})
// })

// // POST ROUTE FOR /PRODUCTS PAGE
// app.post('/products', function (req, res) {
//     res.send('Got a POST request')
//   })
  

// GET ROUTE FOR /PRODUCTS/:ID
// router.get('/products/:id', (req, res) => {
//     res.send('products.ejs');
// });





    module.exports = router;