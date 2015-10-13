var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var app = express();
var bodyParser = require('body-parser');
var crypto = require('crypto');
var Promise = require('bluebird');

// Models
require('./models/Stocks');
require('./models/Users');

// Passport
require('./config/passport');

var User = mongoose.model('User');
var Stock = mongoose.model('Stock');

//Connecting to Database
mongoose.connect('mongodb://localhost/stocks');

app.use(bodyParser.json());

// to support JSON-encoded bodies
app.use(bodyParser({
	extended: true
}));

app.use(passport.initialize());

// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Start server on port 3000
app.listen(3000, function() {
	console.log("It's Started on PORT 3000\n\n\n");
});

// Custom stock param
app.param('stock', function(req, res, next, symbol) {
	var query = Stock.findOne({'symbol': symbol}, function(err, doc) {
		req.stock = doc;
		return next();
	});
});

// Home page
app.get('/', function(req, res) {
	res.sendfile('app/index.html');
});

// Stock listing
app.get('/stocks', function(req, res) {
	Stock.find(function(err, stocks) {
		if (err) throw err;

		res.json(stocks);
	});
});

// Get single stock
app.get('/stocks/:stock', function(req, res) {
	res.json(req.stock);
});

// Create stock
// @todo add data cleaning
app.post('/stocks', function(req, res) {
	var data = req.body;
	var stock = new Stock(data);

	stock.save(function(err, stock) {
		if (err) throw err;

		res.json(stock);
	});
});