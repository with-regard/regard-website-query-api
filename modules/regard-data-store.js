var request = require('request');
var Promise = require('promise');

var queryEndpoint = 'https://query.withregard.io:8888/product/v1';

function makeRequest(options) {
  return new Promise(function (fulfill, reject) {
    request(options, function (error, response, body) {
      if (error || response.statusCode >= 400) {
        error = error || response.statusCode;
        reject(error);
      } else {
        fulfill(body);
      }
    }).auth(process.env.QUERY_USERNAME, process.env.QUERY_PASSWORD);
  });
}

function getUrls(organizationId, productId) {
  function joinUrl() {
    var args = Array.prototype.slice.call(arguments);
    return args.join('/');
  }

  function endpointUrl() {
    return joinUrl(queryEndpoint, organizationId, productId);
  }

  return {
    createProduct: function () {
      return joinUrl(endpointUrl(), 'create');
    },

    registerQuery: function () {
      return joinUrl(endpointUrl(), 'register-query');
    },

    runQuery: function (queryName) {
      return joinUrl(endpointUrl(), 'run-query', queryName);
    },

    runQueryWithUser: function (queryName, userId) {
      return joinUrl(endpointUrl(), 'run-query', queryName, userId);
    },

    optIn: function (userId) {
      return joinUrl(endpointUrl(), 'users', userId, 'opt-in');
    },

    optOut: function (userId) {
      return joinUrl(endpointUrl(), 'users', userId, 'opt-out');
    },

    deleteData: function(userId) {
      return joinUrl(endpointUrl(), 'users', userId, 'delete-data');
    },

    getEventsForUser: function (userId) {
      return joinUrl(endpointUrl(), 'get-events-for-user', userId);
    }
  };
}

module.exports = function (organizationId, productId) {
  if (!organizationId) {
    throw new Error('missing organization');
  }

  if (!productId) {
    throw new Error('missing product');
  }

  var urls = getUrls(organizationId, productId);

  return {
    createProduct: function () {

    },

    registerQuery: function (name, definition) {
      var options = {
        url: urls.registerQuery(),
        json: {
          "query-name": name,
          "query-definition": JSON.parse(definition)
        },
        method: "post"
      };

      return makeRequest(options);
    },

    runQuery: function (queryName) {
      var options = {
        url: urls.runQuery(queryName)
      };

      return makeRequest(options);
    },

    runQueryWithUser: function (queryName, userId) {
      var options = {
        url: urls.runQuery(queryName, userId)
      };

      return makeRequest(options);
    },

    optIn: function (userId) {

    },

    optOut: function (userId) {

    },

    deleteData: function (userId) {
      var options = {
        url: urls.deleteData(userId),
        method: "post"
      };

      return makeRequest(options);
    },

    getEventsForUser: function (userId) {
      var options = {
        url: urls.getEventsForUser(userId)
      };

      return makeRequest(options);
    }
  };
};
