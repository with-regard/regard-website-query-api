var express = require('express');
var QueryClient = require('regard-query-client-node');

var router = express.Router();

router.get('/chartdata/:organization/:product/:id', function (req, res, next) {
  var id = req.params.id;
  var organization = req.params.organization;
  var product = req.params.product;

  var QueryClient = new QueryClient(organization, product);

  QueryClient.runQuery(id).then(function (result) {
    res.json(JSON.parse(result).Results);
  }, next);
});

module.exports = router;
