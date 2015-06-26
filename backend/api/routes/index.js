var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IUCN Red Book' });
});

module.exports = router;
