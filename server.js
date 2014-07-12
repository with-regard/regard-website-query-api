var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var chartDataController = require('./controllers/chartData.js');
var userEventsController = require('./controllers/userEvents.js');
var registerQueryController = require('./controllers/registerQuery.js');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express();

app.use(cors( {origin: true} ));
app.use(bodyParser());

var apiVersion = '/v1';
app.use(apiVersion, chartDataController);
app.use(apiVersion, userEventsController);
app.use(apiVersion, registerQueryController);

// Routes
app.get('/', function (req, res) {
  res.send('Regard website datastore running');
});

app.listen(process.env.port);
console.log("Website datastore started on " + process.env.port);
