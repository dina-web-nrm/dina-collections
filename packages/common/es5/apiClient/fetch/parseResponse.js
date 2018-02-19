'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function parseResponse(response) {
  return response.json().then(function (json) {
    return json;
  }, function (error) {
    return { error: error, response: response };
  }).then(function (json) {
    var status = response.status;

    if (json.error && json.error.name === 'FetchError') {
      var _error = {
        json: {
          message: 'Status code: ' + status + ' - ' + json.error.message,
          status: status,
          type: json.error.type
        },
        status: status
      };
      throw _error;
    }

    if (status >= 200 && status < 300) {
      return json;
    }

    var error = (0, _extends3.default)({}, json, {
      status: status
    });

    throw error;
  });
};