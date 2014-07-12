var express = require('express');
var DataStore = require('../modules/regard-data-store.js');
var Investigation = require('../schemas/investigation.js');

var router = express.Router();

router.post('/register', function (req, res, next) {
  var queryName = req.body.query.id;
  var queryDefinition = req.body.query.queryDefinition;

  var dataStore = new DataStore(req.body.investigation.organization, req.body.investigation.product);

  dataStore.registerQuery(queryName, queryDefinition).done(function () {
    res.send(201); // created
  }, next);
});

module.exports = router;
