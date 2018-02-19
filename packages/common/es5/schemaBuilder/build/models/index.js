'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var interpolate = require('../utilities/interpolate');

var createModel = function createModel(_ref) {
  var model = _ref.model,
      modelKey = _ref.modelKey;

  return interpolate((0, _extends6.default)({}, model, {
    description: model.description || '',
    id: modelKey
  }), '__ROOT__', '');
};

var createResponseModel = function createResponseModel(_ref2) {
  var schema = _ref2.schema,
      name = _ref2.name;

  return createModel({
    model: schema.content,
    name: name
  });
};

var createRequestModel = function createRequestModel(_ref3) {
  var schema = _ref3.schema,
      name = _ref3.name;

  return createModel({
    model: schema.body,
    name: name
  });
};

var extractResponseModelsFromEndpoints = function extractResponseModelsFromEndpoints(endpoints) {
  return (0, _keys2.default)(endpoints).reduce(function (responses, endpointName) {
    var response = endpoints[endpointName].response;

    if (response) {
      var name = response.name,
          schema = response.schema;

      if (name && schema) {
        return (0, _extends6.default)({}, responses, (0, _defineProperty3.default)({}, name, createResponseModel({ schema: schema, name: name })));
      }
    }

    return responses;
  }, {});
};

var extractRequestModelsFromEndpoints = function extractRequestModelsFromEndpoints(endpoints) {
  return (0, _keys2.default)(endpoints).reduce(function (responses, endpointName) {
    var request = endpoints[endpointName].request;

    if (request) {
      var name = request.name,
          schema = request.schema;

      if (name && schema) {
        return (0, _extends6.default)({}, responses, (0, _defineProperty3.default)({}, name, createRequestModel({ schema: schema, name: name })));
      }
    }

    return responses;
  }, {});
};

var extractModelsFromModels = function extractModelsFromModels(models) {
  return (0, _keys2.default)(models).reduce(function (extractedModels, modelKey) {
    var model = models[modelKey];
    return (0, _extends6.default)({}, extractedModels, (0, _defineProperty3.default)({}, modelKey, createModel({ model: model, modelKey: modelKey })));
  }, {});
};

module.exports = function createModels(_ref4) {
  var endpoints = _ref4.endpoints,
      models = _ref4.models;

  var requestModels = extractRequestModelsFromEndpoints(endpoints);
  var responseModels = extractResponseModelsFromEndpoints(endpoints);
  var extractedModels = extractModelsFromModels(models);

  return (0, _extends6.default)({}, extractedModels, responseModels, requestModels);
};