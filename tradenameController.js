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
    Trade.find({"ItemName":req.params.item}, function (err, items) {
        if (err)
            res.send(err);
        res.json({
            message: 'success',
            data: items
        });
    }).sort({"Listed":1});
};