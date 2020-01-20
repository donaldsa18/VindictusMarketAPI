// contactController.js

// Import contact model
PriceHistory = require('./priceHistoryModel');

// Handle index actions
exports.index = function (req, res) {
    PriceHistory.get(function (err, items) {
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
    PriceHistory.find({"ItemName":req.params.item}, function (err, items) {
        if (err)
            res.send(err);
        res.json({
            message: 'success',
            data: items
        });
    }).sort({"Listed":1});
};