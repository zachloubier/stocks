var mongoose = require('mongoose');
var Stock = mongoose.model('Stock');

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