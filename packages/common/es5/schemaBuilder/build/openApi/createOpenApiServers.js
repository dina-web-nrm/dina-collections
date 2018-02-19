"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function createOpenApiServers(apis) {
  return (0, _keys2.default)(apis).map(function (key) {
    var _apis$key = apis[key],
        url = _apis$key.url,
        description = _apis$key.description;


    return {
      description: description,
      url: url
    };
  });
};