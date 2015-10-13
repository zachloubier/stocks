var mongoose = require('mongoose');

var StockSchema = new mongoose.Schema({
	name: String,
	symbol: String,
	price: Number,
	open: Number,
	close: Number
});

mongoose.model('Stock', StockSchema);