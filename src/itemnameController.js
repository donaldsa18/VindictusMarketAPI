// contactController.js

// Import contact model
Autocomplete = require('./autocompleteModel');

// Handle index actions
exports.index = function (req, res) {
    Autocomplete.get(function (err, items) {
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
    Autocomplete.findOne({"label":decodeURIComponent(req.params.itemname)}, function (err, items) {
        if (err)
            res.send(err);
        res.json({
            message: 'success',
            data: items
        });
    });
};