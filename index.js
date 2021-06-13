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
  res.send('Hello World!')
})

// POST ROUTE FOR LOGIN PAGE
app.post('/login', (req, res) => {
  res.send('Hello World!')
})


// GET ROUTE FOR /PRODUCTS PAGE
app.get('/products', (req, res) => {
  res.send('Hello World!')
})

// POST ROUTE FOR /PRODUCTS PAGE
app.post('/products', (req, res) => {
  res.send('Got a POST request')
})

// GET ROUTE FOR /PRODUCTS/:ID
app.get('/products/:id', (req, res) => {
  res.send('products.ejs');
});

//POST ROUTE FOR /PRODUCTS/:ID
app.post('/products/:id', (req, res) => {
  res.send('products.ejs');
});

// GET ROUTE FOR /CART
app.get('/cart', function (req, res) {
  res.send('Hello World!')
})

// DELETE ROUTE FOR /CART
app.delete('/cart', function (req, res) {
  res.send('Hello World!')
})


// GET ROUTE FOR /ABOUTME
app.get('/aboutme', function (req, res) {
  res.send('Hello World!')
})



// // Imports all routes from the controller routes file
// app.use('/', require('..bbyProducts.js'));

//open up port for the app to listen on + define port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening to the smooth sweet sounds of K${process.env.PORT} in the morning ☕️.`)
 rowdyResults.print()
});
