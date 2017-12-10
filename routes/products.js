'use strict';
var express = require('express');
const router =  express.Router();

const authHandler = require('../controllers/authController');

router.get('/view/:id', authHandler.isAuth, function(req, res) {
    var id = req.params.id;
    var sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('database.sqlite');

    db.get("SELECT * FROM products WHERE id = " + id, function(err, row) {
        console.log(row);
        res.render('product', {product: row});
    });

    db.close();
});

router.get('/cart/:id', authHandler.isAuth, function(req, res) {
    var id = req.params.id;
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('database.sqlite');

    db.get("SELECT * FROM products WHERE id = " + id, function(err, row) {
        console.log(row);
        res.json({success:true, text: "Product " + id + " successfully bought"})
    });

    db.close();
});


module.exports = router;