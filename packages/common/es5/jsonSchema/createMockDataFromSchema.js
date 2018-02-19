"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function createMockDataFromSchema(_ref) {
  var importFaker = _ref.importFaker,
      models = _ref.models,
      schema = _ref.schema;

  return importFaker().then(function (jsf) {
    var modelsToUse = (0, _keys2.default)(models).map(function (moduleKey) {
      return models[moduleKey];
    });
    var mock = jsf(schema, modelsToUse);
    return mock;
  });
};