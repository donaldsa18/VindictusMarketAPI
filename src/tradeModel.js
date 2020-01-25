// contactModel.js

var mongoose = require('mongoose');

// Setup schema
var tradeSchema = mongoose.Schema({
    TID: Number,
    CID: Number,
    CharacterName: String,
    ItemName: String,
    Quantity: Number,
    Price: Number,
    Expire: Date,
    Listed: Date,
    Attribute: String,
    Attributes: JSON,
});

// Export Contact model
var trade = module.exports = mongoose.model('Trades', tradeSchema, "Trades");

module.exports.get = function (callback, limit) {
    trade.find(callback).limit(limit);
}