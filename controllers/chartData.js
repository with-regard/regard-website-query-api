var express = require('express');
var DataStore = require('../modules/regard-data-store.js');

var router = express.Router();

router.get('/chartdata/:organization/:product/:id', function (req, res, next) {
  var id = req.params.id;
  var organization = req.params.organization;
  var product = req.params.product;

  var dataStore = new DataStore(organization, product);

  dataStore.runQuery(id).then(function (result) {
    res.json(JSON.parse(result).Results);
  }, next);
});

module.exports = router;
