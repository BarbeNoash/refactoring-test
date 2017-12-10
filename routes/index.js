'use strict';
var express = require('express');
const router =  express.Router();

const authHandler = require('../controllers/authController');

router.get('/', authHandler.isAuth, function(req, res) {
    res.render('index');    
});

module.exports = router;