var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require('body-parser');
var crypto = require('crypto');

//Configure MySQL parameters
var connection = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "root",
	database : "stocks"
});

//Connecting to Database
connection.connect(function(error){
	if(error){
		console.log("Problem with MySQL "+error);
	} else {
		console.log("\n\n\nConnected with Database\n\n\n");
	}

	var user = Users.load(1);

	console.log('1');
	console.log(user.data);

	// user.data.lname = 'wpeorwpeo';

	console.log('2');
	console.log(user);

	user.save();

	console.log('3');
	console.log(user);
});

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
	connection.query("SELECT * FROM stocks WHERE symbol = '" + symbol + "'", function(err, row) {
		if (err) throw err;
		if (!row) {
			return next(new Error('Can\'t find stock'));
		}
		
		req.stock = row[0];
		return next();
	});
})

// Stock listing
app.get('/stocks', function(req, res) {
	connection.query("SELECT * from stocks", function(err, rows) {
		if (err) throw err;
		
		res.json(rows);
	});
});

// Get single stock
app.get('/stocks/:stock', function(req, res) {
	res.json(req.stock);
});

// Create stock
// @todo add data cleaning
app.post('/stocks', function(req, res) {
	// console.log(res);
	connection.query("INSERT into stocks SET ?", req.body, function(err, rows) {
		if (err) throw err;

		res.end("Inserted!");
	})
});

/***** Models *****/

// Models
var Users = {
	_isNew: true,
	data: {},
	load: function(id) {
		if (!id) return this;
		
		var self = this;
				promise = new Promise();

		promise.then(function() {
			connection.query("SELECT * FROM users WHERE id = '?'", id, function(err, row) {
				if (err) throw err;
				
				if (!row) {
					throw new Error('Can\'t find stock');
				}

				self.data = row[0];
				self._isNew = false;
			});
		});

		promise.then({
			fulfilledHandler: function() {
				console.log('fulfilled');
			},
			errorHandler: function() {
				console.log('error');
			},
			progressHandler: function() {
				console.log('unfulfilled');
			}
		})
	},
	setPassword: function(password) {
		this.salt = crypto.randomBytes(16).toString('hex');

		this.password = crypto.pbkdf2sync(password, this.data.salt, 1000, 64).toString('hex');
	},
	validPassword: function(password) {
		var hash = crypto.pbkdf2sync(password, this.data.salt, 1000, 64).toString('hex');

		return this.data.password === hash;
	},
	save: function() {
		if (!this.data) return this;

		if (this._isNew) {

		} else {
			var id = this.data.id;
			this.data.id = undefined;
			connection.query("UPDATE users SET ? WHERE id = ?", this.data, function(err, id) {
				if (err) throw err;

				if (!id) {
					throw new Error('Can\'t save user');
				}
			});

			return this;
		}
	}
};