'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createModel = require('../utilities/createModel');

var referencePath = '';

var extractResponseModelsFromEndpoints = function extractResponseModelsFromEndpoints(endpoints, normalize) {
  return (0, _keys2.default)(endpoints).reduce(function (responses, endpointName) {
    var response = endpoints[endpointName].response;

    if (response) {
      var examples = response.examples,
          name = response.name,
          schema = response.schema;

      if (name && schema) {
        return (0, _extends6.default)({}, responses, (0, _defineProperty3.default)({}, name, createModel({
          examples: examples,
          model: schema.content,
          name: name,
          normalize: normalize,
          referencePath: referencePath
        })));
      }
    }

    return responses;
  }, {});
};

var extractRequestModelsFromEndpoints = function extractRequestModelsFromEndpoints(endpoints, normalize) {
  return (0, _keys2.default)(endpoints).reduce(function (responses, endpointName) {
    var request = endpoints[endpointName].request;

    if (request) {
      var examples = request.examples,
          name = request.name,
          schema = request.schema;

      if (name && schema) {
        return (0, _extends6.default)({}, responses, (0, _defineProperty3.default)({}, name, createModel({
          examples: examples,
          model: schema.body,
          name: name,
          normalize: normalize,
          referencePath: referencePath
        })));
      }
    }

    return responses;
  }, {});
};

var extractModelsFromModels = function extractModelsFromModels(models, normalize) {
  return (0, _keys2.default)(models).reduce(function (extractedModels, modelKey) {
    var model = models[modelKey];
    return (0, _extends6.default)({}, extractedModels, (0, _defineProperty3.default)({}, modelKey, createModel({ model: model, modelKey: modelKey, normalize: normalize, referencePath: referencePath })));
  }, {});
};

module.exports = function createModels(_ref) {
  var endpoints = _ref.endpoints,
      models = _ref.models,
      normalize = _ref.normalize;

  var requestModels = extractRequestModelsFromEndpoints(endpoints, normalize);
  var responseModels = extractResponseModelsFromEndpoints(endpoints, normalize);
  var extractedModels = extractModelsFromModels(models, normalize);

  return (0, _extends6.default)({}, extractedModels, responseModels, requestModels);
};