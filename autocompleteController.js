// contactController.js

// Import contact model
Item = require('./autocompleteModel');

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
            data: items[0].payload
        });
    });
};