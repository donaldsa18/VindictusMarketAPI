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
            data: items[0].payload
        });
    });
};

// Handle view contact info
exports.search = function (req, res) {
    Autocomplete.find({"label":{$regex:"^"+req.params.text, $options:"i"}}, function (err, items) {
        if (err)
            res.send(err);
        else if(items.length < 10) {
            Item.find({"label":{$regex:".+"+req.params.text, $options:"i"}}, function (err2, items2) {
                if (err2)
                    res.send(err2);
                res.json({
                    message: 'success',
                    data: items.concat(items2)
                });
            }).sort({"label":1}).limit(10-items.length);
        }
        else {
            res.json({
                message: 'success',
                data: items
            });
        }
    }).sort({"label":1}).limit(10);
};
