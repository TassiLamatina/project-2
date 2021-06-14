// import
const express = require('express')
const axios = require('axios')
require('dotenv').config() 
const layouts = require('express-ejs-layouts')
let methodOverride = require('method-override');
const router = express.Router();
const controller = require('./controller/bbyProducts.js')
const rowdy = require('rowdy-logger')


// define API key
const BESTBUYAPI = process.env.BESTBUYAPI

// declare apps
const app = express()
const rowdyResults = rowdy.begin(app)
app.set('view engine', 'ejs')
app.use(layouts) // use ejs layouts
app.use('/', router);
app.use(express.urlencoded({ extended: false }))
app.use(express.static('static'))
app.use(methodOverride('_method'))

// GET ROUTE FOR "/" HOME PAGE displays main greeting and login button
app.get('/', (req, res) => {
  res.render('home.ejs')
})

// GET ROUTE FOR LOGIN PAGE
app.get('/login', (req, res) => {
  res.render('login.ejs')
})

// POST ROUTE FOR LOGIN PAGE
app.post('/login', (req, res) => {
  res.render('login.ejs')
})


// GET ROUTE FOR /PRODUCTS PAGE
app.get('/products', (req, res) => {
  res.render('./products/products.ejs')
})

// POST ROUTE FOR /PRODUCTS PAGE
// app.post('/products', (req, res) => {
//   res.render('./products/products.ejs')
// })

// GET ROUTE FOR /PRODUCTS/:ID
// app.get('/products/:id', (req, res) => {
//   res.render('./products/products.ejs');
// });

//POST ROUTE FOR /PRODUCTS/:ID
app.post('/products', (req, res) => {
  // e.preventDefault()
  let searchQuery = req.body.name
  axios.get(`"https://api.bestbuy.com/v1/products(search=${ searchQuery })?format=json&show=sku,name,salePrice&apiKey=${BESTBUYAPI}`)
        .then((resFromAPI) =>{ console.log(searchQuery)
            console.log(resFromAPI)
            res.send("hello world")
        })
        .catch(err => {console.log(err)})
  // res.render('./products/products.ejs');
});

// GET ROUTE FOR /CART
app.get('/cart', function (req, res) {
  res.render('cart.ejs')
})

// DELETE ROUTE FOR /CART
app.delete('/cart', function (req, res) {
  res.render('cart.ejs')
})


// GET ROUTE FOR /ABOUTME
app.get('/about', function (req, res) {
  res.render('aboutMe.ejs')
})

// GET ROUTE FOR /PRODUCTDETAILS
app.get('/details/:id', function (req, res) {
  res.render('productDetails.ejs')
})

// POST ROUTE FOR /PRODUCTDETAILS 
app.post('/details/:id', function (req, res) {
  res.render('productDetails.ejs')
})

// GET ROUTE FOR /JOIN
app.get('/join', function (req, res) {
  res.render('joinUs.ejs')
})

// POST ROUTE FOR /JOIN
app.post('/join', function (req, res) {
  res.render('joinUs.ejs')
})



// // Imports all routes from the controller routes file
// app.use('/', require('..bbyProducts.js'));

//open up port for the app to listen on + define port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening to the smooth sweet sounds of K${process.env.PORT} in the morning ☕️.`)
 rowdyResults.print()
});
