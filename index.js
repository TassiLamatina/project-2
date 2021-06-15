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

// POST ROUTE FOR LOGIN PAGE
app.post('/login', (req, res) => {
  let currentUser = req.body.userName
  
  res.render('login.ejs', { userName: currentUser })
})

// GET ROUTE FOR LOGIN PAGE
app.get('/login', (req, res) => {
  res.render('login.ejs')
})




// GET ROUTE FOR /PRODUCTS PAGE
app.get('/products', (req, res) => {
let currentUser = req.query.user
console.log(req.query)
db.user.findOne({
  where: {
    userName: currentUser
  } 
}) .then(user => {


  axios.get(`https://api.bestbuy.com/v1/products(search=${ req.query.name })?format=json&show=name,thumbnailImage,regularPrice,salePrice,description,customerTopRated,mediumImage,addToCartUrl,longDescription,color,condition,largeImage,modelNumber,percentSavings&apiKey=${BESTBUYAPI}`)
        .then((resFromAPI) =>{ 
        // console.log(req.query.name)
        //     console.log(resFromAPI.data)
        console.log(user,"😂😂😂😂😂😂")
          const products = resFromAPI.data.products.filter( (product) =>{
            const savings = parseFloat(product.percentSavings)
            return savings > 40
          })
            res.render('./products/results.ejs', {products: products, userName:user.userName},)

        })
        .catch(err => {console.log(err)})
      })
});
 

// GET ROUTE FOR /results
app.get('/results', (req, res) => {
  res.render('./products/results.ejs');
});


// GET ROUTE FOR /CART
app.get('/cart', function (req, res) {
  res.render('cart')
})

// post cart
app.post('/cart', function (req, res) {
  db.product.findOrCreate({
    where: { product: product.name },
    defaults: {
        name: product.name,
        thumbnailImage: product.thumbnailImage,
        regularPrice: product.regularPrice,
        salePrice: product.salePrice,
        description: product.description,
        customerTopRated: product.customerTopRated,
        mediumImage: product.mediumImage,
        addToCartUrl: product.addToCartUrl,
        longDescription: product.longDescription,
        color: product.color,
        condition: product.condition,
        largeImage: product.largeImage,
        modelNumber: product.modelNumber,
        percentSavings: product.percentSavings
    }
})
  res.redirect('/cart')
})

// DELETE ROUTE FOR /CART
// app.delete('/cart', function (req, res) {
//   res.render('cart.ejs')
// })

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
}) .then ( ([user, created])=> {
  res.redirect(`/products?user=${user.userName}`)
})
  
})


// // Imports all routes from the controller routes file
// app.use('/', require('..bbyProducts.js'));

//open up port for the app to listen on + define port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening to the smooth sweet sounds of K${process.env.PORT} in the morning ☕️.`)
 rowdyResults.print()
});
