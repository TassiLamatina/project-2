var express = require('express');
var router = express.Router();
let db = require('../models');
let axios = require('axios');

                // ROUTES:
router.get('/', (req, res) => {
    res.render('index', { error: req.query.error });
});

// GET ROUTE FOR /LOGIN PAGE displays log in form with boolean for matching username/password.

// POST ROUTE FOR /LOGING PAGE grabs user input and verifies boolean

// GET ROUTE FOR /PRODUCTS PAGE

// POST ROUTE FOR /PRODUCTS PAGE

// GET ROUTE FOR /PRODUCTS/:ID