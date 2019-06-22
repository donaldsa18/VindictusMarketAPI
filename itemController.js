// contactController.js

// Import contact model
Item = require('./itemModel');

// Handle index actions
exports.index = function (req, res) {
    Item.get(function (err, items) {
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

// Handle view contact info
exports.view = function (req, res) {
    Item.findOne({item_class:req.params.item}, function (err, items) {
        if (err)
            res.send(err);
        res.json({
            message: 'success',
            data: items
        });
    });
};