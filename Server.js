var express = require("express");
var mysql = require("mysql");
var mongoose = require("mongoose");
var app = express();
var bodyParser = require('body-parser');
var crypto = require('crypto');
var Promise = require('bluebird');

// Models
require('./models/Users');

var User = mongoose.model('User');

//Connecting to Database
mongoose.connect('mongodb://localhost/stocks');

app.use(bodyParser.json());

// to support JSON-encoded bodies
app.use(bodyParser({
	extended: true
}));

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

// Home page
app.get('/', function(req, res) {
	res.sendfile('app/index.html');
});

// Custom stock param
app.param('stock', function(req, res, next, symbol) {
	// connection.query("SELECT * FROM stocks WHERE symbol = '" + symbol + "'", function(err, row) {
	// 	if (err) throw err;
	// 	if (!row) {
	// 		return next(new Error('Can\'t find stock'));
	// 	}
		
	// 	req.stock = row[0];
	// 	return next();
	// });

	var user = User.findById(1);

	console.log(user);
})

// Stock listing
app.get('/stocks', function(req, res) {
	User.find(function(err, users) {
		if (err) throw err;

		res.json(users);
	});
	// connection.query("SELECT * from stocks", function(err, rows) {
	// 	if (err) throw err;
		
	// 	res.json(rows);
	// });
});

// Get single stock
app.get('/stocks/:stock', function(req, res) {
	res.json(req.stock);
});

// Create stock
// @todo add data cleaning
app.post('/stocks', function(req, res) {
	var user = new User({
		fname: "zach",
		lname: "loubier",
		username: "zloubier",
		password: "watson123",
		salt: "salt"
	});

	user.save(function(err, user) {
		if (err) throw err;

		res.json(user);
	});

	// console.log(res);
	// connection.query("INSERT into stocks SET ?", req.body, function(err, rows) {
	// 	if (err) throw err;

	// 	res.end("Inserted!");
	// })
});