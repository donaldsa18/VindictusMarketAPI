// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialize the app
let app = express();
let enableWs = require('express-ws');
enableWs(app);

// Import routes
let apiRoutes = require("./api-routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
const mongoHost = process.env.MONGO_URI || "localhost";
mongoose.connect('mongodb://'+mongoHost+'/MarketQuery');

var db = mongoose.connection;
// Setup server port
var port = process.env.PORT || 3003;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes)

var locationController = require('./locationController');
app.ws('/ws/locations',locationController.location);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running API on port " + port);
});