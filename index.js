// import
const express = require('express')
const axios = require('axios')
require('dotenv').config() 
const layouts = require('express-ejs-layouts')
let methodOverride = require('method-override');
const router = express.Router();
const controller = require('./controller/bbyProducts.js')
const rowdy = require('rowdy-logger')
const db = require('./models')


// define API key
const BESTBUYAPI = process.env.BESTBUYAPI

// declare apps
const app = express()
const rowdyResults = rowdy.begin(app)
app.set('view engine', 'ejs')
app.use(layouts) // use ejs layouts
app.use('/', router);
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
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
  axios.get(`https://api.bestbuy.com/v1/products(search=${ req.query.name })?format=json&show=name,thumbnailImage,regularPrice,salePrice,description,customerTopRated,mediumImage,addToCartUrl,longDescription,color,condition,largeImage,modelNumber,percentSavings&apiKey=${BESTBUYAPI}`)
        .then((resFromAPI) =>{ console.log(req.query.name)
            console.log(resFromAPI.data)
          const products = resFromAPI.data.products.filter( (product) =>{
            const savings = parseFloat(product.percentSavings)
            return savings > 40
          })
            res.render('./products/results.ejs', {products: products})

        })
        .catch(err => {console.log(err)})
  
});
 

// GET ROUTE FOR /results
app.get('/results', (req, res) => {
  res.render('./products/results.ejs');
});

//POST ROUTE FOR /PRODUCTS/:ID
// app.post('/products', (req, res) => {
//   // e.preventDefault()
//   let searchQuery = req.query.name
// })

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
  db.user.findOrCreate({
    where: { userName: req.body.userName },
    defaults: {
        userName: req.body.userName,
        password: req.body.password
    }
})
  res.redirect('/products')
})


// // Imports all routes from the controller routes file
// app.use('/', require('..bbyProducts.js'));

//open up port for the app to listen on + define port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening to the smooth sweet sounds of K${process.env.PORT} in the morning ☕️.`)
 rowdyResults.print()
});
