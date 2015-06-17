
var express = require('express');
var router = express.Router();
var product = require('../controllers/product')


router.get('/',product.output)


module.exports=router

