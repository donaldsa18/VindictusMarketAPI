// contactController.js

// Import contact model
Trade = require('./tradeModel');

// Handle index actions
exports.index = function (req, res) {
    Trade.get(function (err, items) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            data: items
        });
    });
};
//{"ItemName":req.params.item}
//
// Handle view contact info
exports.view = function (req, res) {
    var now = (new Date()).toISOString();
    Trade.find({ItemName:req.params.item, Expire:{$gt:now}}, function (err, items) {
        if (err)
            res.send(err);
        res.json({
            message: 'success',
            data: items
        });
    }).sort({"Price":1}).limit(10);
};