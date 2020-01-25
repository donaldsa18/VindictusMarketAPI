// contactModel.js

var mongoose = require('mongoose');

// Setup schema
var autocompleteSchema = mongoose.Schema({
    label: String,
    value: String
});

// Export Contact model
var autocomplete = module.exports = mongoose.model('Autocomplete', autocompleteSchema, "Autocomplete");

module.exports.get = function (callback, limit) {
    autocomplete.find(callback).limit(limit);
}