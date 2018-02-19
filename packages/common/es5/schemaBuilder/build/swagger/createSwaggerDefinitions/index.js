'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var interpolate = require('../../utilities/interpolate');

var createModel = function createModel(model) {
  var cleanedModel = model;
  if (model.modelType) {
    cleanedModel['x-modelType'] = model.modelType;
    delete cleanedModel.modelType;
  }
  return interpolate(cleanedModel, '__ROOT__', '#/definitions/');
};
var createResponseObject = function createResponseObject(schema) {
  return createModel(schema.content);
};

var createRequestObject = function createRequestObject(schema) {
  return createModel(schema.body);
};

var extractResponsesFromEndpoints = function extractResponsesFromEndpoints(endpoints) {
  return (0, _keys2.default)(endpoints).reduce(function (responses, endpointName) {
    var response = endpoints[endpointName].response;

    if (response) {
      var name = response.name,
          schema = response.schema;

      if (name && schema) {
        return (0, _extends6.default)({}, responses, (0, _defineProperty3.default)({}, name, createResponseObject(schema)));
      }
    }

    return responses;
  }, {});
};

var extractRequestsFromEndpoints = function extractRequestsFromEndpoints(endpoints) {
  return (0, _keys2.default)(endpoints).reduce(function (responses, endpointName) {
    var request = endpoints[endpointName].request;

    if (request) {
      var name = request.name,
          schema = request.schema;

      if (name && schema) {
        return (0, _extends6.default)({}, responses, (0, _defineProperty3.default)({}, name, createRequestObject(schema)));
      }
    }

    return responses;
  }, {});
};

var extractModelsFromModels = function extractModelsFromModels(models) {
  return (0, _keys2.default)(models).reduce(function (extractedModels, modelKey) {
    var model = models[modelKey];
    var createdModel = createModel(model);
    return (0, _extends6.default)({}, extractedModels, (0, _defineProperty3.default)({}, modelKey, createdModel));
  }, {});
};

module.exports = function createSwaggerDefinitions(_ref) {
  var endpoints = _ref.endpoints,
      models = _ref.models;

  var requests = extractRequestsFromEndpoints(endpoints);
  var responses = extractResponsesFromEndpoints(endpoints);

  var extractedModels = extractModelsFromModels(models);

  return (0, _extends6.default)({}, extractedModels, requests, responses);
};