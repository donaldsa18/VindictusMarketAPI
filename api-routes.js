// api-routes.js

// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to API crafted with love!',
    });
});

// Import contact controller
var itemController = require('./itemController');
router.route('/items')
    .get(itemController.index);

router.route('/items/:item')
    .get(itemController.view);

var itemnamesController = require('./itemnameController');
    router.route('/itemnames/')
        .get(itemnamesController.index);
    
    router.route('/itemnames/:itemname')
        .get(itemnamesController.view);


var autocompleteController = require('./autocompleteController');
router.route('/autocomplete')
    .get(autocompleteController.index);

router.route('/autocomplete/:text')
    .get(autocompleteController.search);

var tradeController = require('./tradeController');
router.route('/trades')
    .get(tradeController.index);

router.route('/trades/:item')
    .get(tradeController.view);

var tradenameController = require('./tradenameController');
    router.route('/tradenames')
        .get(tradenameController.index);
    
    router.route('/tradenames/:itemname')
        .get(tradenameController.view);

var priceHistoryController = require('./priceHistoryController');
router.route('/pricehistory')
    .get(priceHistoryController.index);

router.route('/pricehistory/:item')
    .get(priceHistoryController.view);
    

// Export API routes
module.exports = router;