// contactModel.js

var mongoose = require('mongoose');

// Setup schema
var itemSchema = mongoose.Schema({
    icon: String,
    trade_on_bind: String,
    sanitized_name: String,
    item_class: String,
    required_level: Number,
    trade_restriction: String,
    bind: String,
    trade_category_sub: String,
    trade_category: String,
    sell_price: Number
});

// Export Contact model
var item = module.exports = mongoose.model('Items', itemSchema, "Items");

module.exports.get = function (callback, limit) {
    item.find(callback).limit(limit);
}