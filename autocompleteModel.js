// contactModel.js

var mongoose = require('mongoose');

// Setup schema
var itemSchema = mongoose.Schema({
    payload: [{type: String}]
});

// Export Contact model
var item = module.exports = mongoose.model('Autocomplete', itemSchema, "Autocomplete");

module.exports.get = function (callback, limit) {
    item.find(callback).limit(limit);
}