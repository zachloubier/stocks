var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require('body-parser');


/*
* Configure MySQL parameters.
*/
var connection = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "root",
	database : "stocks"
});

/*Connecting to Database*/

connection.connect(function(error){
	if(error){
		console.log("Problem with MySQL "+error);
	} else {
		console.log("Connected with Database");
	}
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// })); 

// to support JSON-encoded bodies
app.use(bodyParser({
	extended: true
}));
// app.use(express.urlencoded()); // to support URL-encoded bodies

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.listen(3000, function() {
	console.log("It's Started on PORT 3000");
});

app.get('/', function(req, res) {
	res.sendfile('app/index.html');
});

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

app.get('/stocks', function(req, res) {
	connection.query("SELECT * from stocks", function(err, rows) {
		if (err) throw err;
		
		res.json(rows);
	});
});

app.get('/stocks/:stock', function(req, res) {
	res.json(req.stock);
});

app.post('/stocks', function(req, res) {
	// @todo add data cleaning
	console.log(req.body);
	// console.log(res);
	connection.query("INSERT into stocks SET ?", req.body, function(err, rows) {
		if (err) throw err;

		res.end("Inserted!");
	})
});