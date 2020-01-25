// contactModel.js

var mongoose = require('mongoose');

// Setup schema
var locationSchema = mongoose.Schema({
    CID: Number,
    X: Number,
    Y: Number,
    Vx: Number,
    Vy: Number,
    Yaw: Number,
    Time: Date,
});

// Export Contact model
var location = module.exports = mongoose.model('Locations', locationSchema, "Locations");

module.exports.get = function (callback, limit) {
    location.find(callback).limit(limit);
}

//module.exports.watch = location.watch()