var express = require('express');
var QueryClient = require('regard-query-client-node');

var router = express.Router();

router.get('/userevents/:organization/:product/:id', function (req, res, next) {
  var id = req.params.id;
  var client = new QueryClient(req.params.organization, req.params.product);

  client.getEventsForUser(id).then(function (events) {
    res.json({
      id: req.params.id,
      organization: req.params.organization,
      product: req.params.product,
      events: JSON.parse(events)
    });
  }, next);
});

router.delete('/userevents/:organization/:product/:id', function (req, res, next) {
  var id = req.params.id;
  var client = new QueryClient(req.params.organization, req.params.product);

  client.deleteData(id).then(function () {
    res.send(200);
  }, next);
});

module.exports = router;
