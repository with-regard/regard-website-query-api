var express = require('express');
var DataStore = require('../modules/regard-data-store.js');

var router = express.Router();

router.post(':organization/:project/register', function (req, res, next) {
  var organization = req.params.organization;
  var project = req.params.project;

  var queryName = req.body.query.id;
  var queryDefinition = req.body.query.queryDefinition;

  var dataStore = new DataStore(organization, project);

  dataStore.registerQuery(queryName, queryDefinition).done(function () {
    res.send(201); // created
  }, next);
});

module.exports = router;
