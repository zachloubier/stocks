var mongoose = require('mongoose');

var StockSchema = new mongoose.Schema({
	name: String,
	symbol: String,
	price: String,
	open: String,
	close: String
});

mongoose.model('User', UserSchema);