// contactModel.js

var mongoose = require('mongoose');

// Setup schema
var priceHistorySchema = mongoose.Schema({
    ItemName: String,
    MinPrice: Number,
    First100Price: Number,
    AvgPrice: Number,
    Listed: Date,
});

// Export Contact model
var priceHistory = module.exports = mongoose.model('PriceHistory', priceHistorySchema, "PriceHistory");

module.exports.get = function (callback, limit) {
    priceHistory.find(callback).limit(limit);
}