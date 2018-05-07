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

var extractResponseModelsFromEndpoints = function extractResponseModelsFromEndpoints(_ref) {
  var endpoints = _ref.endpoints,
      normalize = _ref.normalize,
      version = _ref.version;

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
          referencePath: referencePath,
          version: version
        })));
      }
    }

    return responses;
  }, {});
};

var extractRequestModelsFromEndpoints = function extractRequestModelsFromEndpoints(_ref2) {
  var endpoints = _ref2.endpoints,
      normalize = _ref2.normalize,
      version = _ref2.version;

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
          referencePath: referencePath,
          version: version
        })));
      }
    }

    return responses;
  }, {});
};

var extractModelsFromModels = function extractModelsFromModels(_ref3) {
  var models = _ref3.models,
      normalize = _ref3.normalize,
      version = _ref3.version;

  return (0, _keys2.default)(models).reduce(function (extractedModels, modelKey) {
    var model = models[modelKey];
    return (0, _extends6.default)({}, extractedModels, (0, _defineProperty3.default)({}, modelKey, createModel({
      model: model,
      modelKey: modelKey,
      normalize: normalize,
      referencePath: referencePath,
      version: version
    })));
  }, {});
};

module.exports = function createModels(_ref4) {
  var endpoints = _ref4.endpoints,
      models = _ref4.models,
      normalize = _ref4.normalize,
      version = _ref4.version;

  var requestModels = extractRequestModelsFromEndpoints({
    endpoints: endpoints,
    normalize: normalize,
    version: version
  });
  var responseModels = extractResponseModelsFromEndpoints({
    endpoints: endpoints,
    normalize: normalize,
    version: version
  });
  var extractedModels = extractModelsFromModels({
    models: models,
    normalize: normalize,
    version: version
  });

  return (0, _extends6.default)({}, extractedModels, responseModels, requestModels);
};