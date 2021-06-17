// import
const express = require('express');
const axios = require('axios');
require('dotenv').config(); 
const layouts = require('express-ejs-layouts');
let methodOverride = require('method-override');
const router = express.Router();
const rowdy = require('rowdy-logger');
const db = require('./models');


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


// GET ROUTE FOR /JOIN
app.get('/join', function (req, res) {
  res.render('joinUs.ejs')
})


// POST ROUTE FOR /JOIN
app.post('/join', function (req, res) {
  console.log(req.body)
  db.User.findOrCreate({
    where: { userName: req.body.userName},
    defaults: {
        userName: req.body.userName,
        password: req.body.password
    }
 }) .then ( ([User, created])=> {
  res.redirect(`/search?user=${User.userName}`)
 })
})


// DELETE ROUTE FOR /login
app.delete('/join', async (req, res) => {
     let numRowsDeleted = await db.user.destroy({
    where: { name: req.body.userName }
 }) .then ( ([User, deleted])=> {
  res.redirect('/login')
 })
})


// PUT route for /login
app.put('/login', async (req, res) => {
  db.user.update({
    where: { password: req.body.password }
 }) .then ( ([User, created])=> {
  res.redirect('/login')
 })
})


// get /search
app.get('/search', (req, res) => {
  let currentUser = req.query.user
db.user.findOne({
  where: {
    name: currentUser
  } 
})
  res.render('products/searchForm.ejs', {user:req.query.user})
})


// GET ROUTE FOR /PRODUCTS PAGE
app.get('/products', (req, res) => {
let currentUser = req.query.user
db.User.findOne({
  where: {
    name: currentUser
  } 
}) .then(user => {
  axios.get(`https://api.bestbuy.com/v1/products(search=${ req.query.name })?format=json&show=name,thumbnailImage,regularPrice,salePrice,description,customerTopRated,mediumImage,addToCartUrl,longDescription,color,condition,largeImage,modelNumber,sku,percentSavings&apiKey=${BESTBUYAPI}`)
        .then((resFromAPI) =>{ 
          const products = resFromAPI.data.products.filter( (product) =>{
            const savings = parseFloat(product.percentSavings)
            return savings > 40
          })
            res.render('./products/results.ejs', {products:products, name:user.name})
        })
        .catch(err => {console.log(err)})
      })
});
 

// post /cart
app.post('/cart', function (req, res) {
  console.log(req.body)
  db.Product.findOrCreate({
    where: { product: req.body.name },
    defaults: {
      name: req.body.name,
      thumbnailImage: req.body.thumbnailImage,
      regularPrice: req.body.regularPrice,
      salePrice: req.body.salePrice,
      description: req.body.description,
      customerTopRated: req.body.customerTopRated,
      mediumImage: req.body.mediumImage,
      addToCartUrl: req.body.addToCartUrl,
      longDescription: req.body.longDescription,
      color: req.body.color,
      condition: req.body.condition,
      largeImage: req.body.largeImage,
      modelNumber: req.body.modelNumber,
      percentSavings: req.body.percentSavings,
  }
})
  res.redirect('/cart'+ req.body.name)
})


// GET ROUTE FOR /results
app.get('/results', (req, res) => {
  let currentUser = req.query.user
db.User.findOne({
  where: {
    name: currentUser
  }   
}) .then(user => {
  res.render('./products/results.ejs');
})
})


// GET ROUTE FOR /CART
app.get('/cart/:userId', function (req, res) {
  let currentUser = req.query.user
db.Product.findAll({
  where: { product: product.name },
}) .then(user => {
  res.render('./products/cart.ejs',{ userId: params } );
})
})


//         // STRETCH GOAL ROUTES


// // POST ROUTE FOR LOGIN PAGE STRETCH
// app.post('/login', (req, res) => {
//   let currentUser = req.query.user
// db.User.findOne({
//   where: {
//     name: currentUser
//   } 
  
//   res.render('login.ejs', { name: currentUser })
// })

// // GET ROUTE FOR LOGIN PAGE STRETCH
// app.get('/login', (req, res) => {
//   let currentUser = req.query.user
// db.User.findOne({
//   where: {
//     name: currentUser
//   } 
//   res.render('login.ejs')
// })


// // GET ROUTE FOR /ABOUTME STRETCH
// app.get('/about', function (req, res) {
//   res.render('aboutMe.ejs')
// })


// // GET ROUTE FOR /PRODUCTDETAILS STRETCH
// app.get('/details/:id', function (req, res) {
//   let currentUser = req.query.user
// db.User.findOne({
//   where: {
//     name: currentUser
//   } 
//   res.render('productDetails.ejs')
// })


// // POST ROUTE FOR /PRODUCTDETAILS STRETCH
// app.post('/details/:id', function (req, res) {
//   let currentUser = req.query.user
// db.User.findOne({
//   where: {
//     name: currentUser
//   } 
//   res.render('productDetails.ejs')
// })


//open up port for the app to listen on + define port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening to the smooth sweet sounds of K${process.env.PORT} in the morning ☕️.`)
 rowdyResults.print()
});
