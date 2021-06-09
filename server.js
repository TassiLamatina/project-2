// import
const express = require('express')
const axios = require('axios')
require('dotenv').config() 
const layouts = require('express-ejs-layouts')
let methodOverride = require('method-override');
const bbyController = require('./controller/bestbuy.ejs')
axios.get(``)

// define API key
const BESTBUYAPI = process.env.BESTBUYAPI

// declare apps
const app = express()
app.set('view engine', 'ejs')
app.use(layouts) // use ejs layouts
app.use('/', bbyController)
app.use(express.urlencoded({ extended: false }))
app.use(express.static('static'))
app.use(methodOverride('_method'))

// GET ROUTE FOR "/" HOME PAGE displays main greeting and login button
app.get('/', (req, res) => {
  res.render('home.ejs')
})


//open up port for the app to listen on + define port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening to the smooth sweet sounds of K${process.env.PORT} in the morning ☕️.`)
});
