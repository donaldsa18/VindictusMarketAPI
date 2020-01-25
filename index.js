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
let apiRoutes = require("./src/api-routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
let mongoHost = process.env.MONGO_HOSTNAME || "localhost";
const mongoPort = process.env.MONGO_PORT || "27017";
const mongoDB = process.env.MONGO_DB || "MarketQuery"

let connStr = 'mongodb://'+mongoHost+':'+mongoPort+'/'+mongoDB;
let mongoOptions = {
    useNewUrlParser: true
};
if(process.env.MONGO_USERNAME) {
    mongoOptions.user = process.env.MONGO_USERNAME;
    mongoOptions.pass = process.env.MONGO_PASSWORD;
    connStr += "?authsource=admin";
}
console.log(connStr);
var connectWithRetry = function() {
return mongoose.connect(connStr, mongoOptions, function(err) {
    if (err) {
    console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
    setTimeout(connectWithRetry, 5000);
    }
});
};
connectWithRetry();

var db = mongoose.connection;
// Setup server port
var port = process.env.PORT || 3003;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes)

var locationController = require('./src/locationController');
app.ws('/ws/locations',locationController.location);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running API on port " + port);
});