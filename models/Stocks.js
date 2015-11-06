var mongoose = require('mongoose');

var StockSchema = new mongoose.Schema({
	name: String,
	symbol: String,
	price: Number,
	open: Number,
	close: Number,
	users: [{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}]
});

mongoose.model('Stock', StockSchema);