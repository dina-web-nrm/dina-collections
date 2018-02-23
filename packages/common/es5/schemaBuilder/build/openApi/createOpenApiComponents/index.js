'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var interpolate = require('../../utilities/interpolate');

var createModel = function createModel(model, examples) {
  var cleanedModel = model;
  if (model.modelType) {
    cleanedModel['x-modelType'] = model.modelType;
    delete cleanedModel.modelType;
  }
  if (examples) {
    cleanedModel['x-examples'] = examples;

    if (examples.primary) {
      cleanedModel.example = examples.primary;
    }
  }

  return interpolate(cleanedModel, '__ROOT__', '#/components/schemas/');
};

var createResponseObject = function createResponseObject(schema, examples) {
  return createModel(schema.content, examples);
};

var createRequestObject = function createRequestObject(schema, examples) {
  return createModel(schema.body, examples);
};

var extractResponsesFromEndpoints = function extractResponsesFromEndpoints(endpoints) {
  return (0, _keys2.default)(endpoints).reduce(function (responses, endpointName) {
    var response = endpoints[endpointName].response;

    if (response) {
      var name = response.name,
          schema = response.schema,
          examples = response.examples;

      if (name && schema) {
        return (0, _extends6.default)({}, responses, (0, _defineProperty3.default)({}, name, createResponseObject(schema, examples)));
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
          schema = request.schema,
          examples = request.examples;

      if (name && schema) {
        return (0, _extends6.default)({}, responses, (0, _defineProperty3.default)({}, name, createRequestObject(schema, examples)));
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

module.exports = function createOpenApiComponents(_ref) {
  var endpoints = _ref.endpoints,
      models = _ref.models,
      security = _ref.security;

  var requests = extractRequestsFromEndpoints(endpoints);
  var responses = extractResponsesFromEndpoints(endpoints);
  var extractedModels = extractModelsFromModels(models);

  return {
    schemas: (0, _extends6.default)({}, extractedModels, requests, responses),
    securitySchemes: (0, _extends6.default)({}, security)
  };
};