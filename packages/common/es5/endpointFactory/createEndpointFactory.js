'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var openApiSpec = require('../../dist/openApi.json');

var _require = require('../error'),
    createSystemModelSchemaValidator = _require.createSystemModelSchemaValidator;

var createMockGenerator = require('../jsonSchema/createMockGenerator');

var buildOperationIdPathnameMap = function buildOperationIdPathnameMap() {
  var map = {};
  (0, _keys2.default)(openApiSpec.paths).forEach(function (pathname) {
    var methods = openApiSpec.paths[pathname];
    (0, _keys2.default)(methods).forEach(function (methodName) {
      var methodSpecification = methods[methodName];
      if (methodSpecification.operationId) map[methodSpecification.operationId] = {
        methodName: methodName,
        methodSpecification: methodSpecification,
        pathname: pathname
      };
    });
  });

  return map;
};

var map = buildOperationIdPathnameMap();

var getModelNameFromSchema = function getModelNameFromSchema(schema) {
  if (!schema) {
    return null;
  }

  if (!schema.$ref) {
    return null;
  }

  var segments = schema.$ref.split('/');

  return segments[segments.length - 1];
};

var getSchemaFromRequestBody = function getSchemaFromRequestBody(requestBody) {
  return requestBody && requestBody.content && requestBody.content['application/vnd.api+json'] && requestBody.content['application/vnd.api+json'].schema;
};

var getSchemaFromResponse = function getSchemaFromResponse(response) {
  return response && response.content && response.content['application/vnd.api+json'] && response.content['application/vnd.api+json'].schema;
};

var getBodyValidator = function getBodyValidator(_ref) {
  var methodSpecification = _ref.methodSpecification,
      origin = _ref.origin;

  var schema = getSchemaFromRequestBody(methodSpecification.requestBody);

  if (schema) {
    var modelName = getModelNameFromSchema(schema);
    return createSystemModelSchemaValidator({
      context: 'inputBodyValidation',
      model: modelName,
      origin: origin,
      throwOnError: true
    });
  }

  return null;
};

var getResponseValidator = function getResponseValidator(_ref2) {
  var methodSpecification = _ref2.methodSpecification,
      origin = _ref2.origin;

  var schema = getSchemaFromResponse(methodSpecification.responses[200]);
  if (schema) {
    var modelName = getModelNameFromSchema(schema);
    if (modelName) {
      return createSystemModelSchemaValidator({
        context: 'responseValidation',
        model: modelName,
        origin: origin,
        throwOnError: true
      });
    }
    return createSystemModelSchemaValidator({
      origin: origin,
      schema: schema,
      throwOnError: true
    });
  }

  return null;
};

var getExamplesFromMethodSpecifiction = function getExamplesFromMethodSpecifiction(methodSpecification) {
  var schema = getSchemaFromResponse(methodSpecification.responses[200]);
  if (!schema) {
    return null;
  }

  var modelName = getModelNameFromSchema(schema);
  if (!modelName) {
    return null;
  }

  return openApiSpec && openApiSpec.components && openApiSpec.components.schemas && openApiSpec.components.schemas[modelName] && openApiSpec.components.schemas[modelName]['x-examples'];
};

var createMockData = function createMockData(_ref3) {
  var importFaker = _ref3.importFaker,
      methodSpecification = _ref3.methodSpecification;

  var schema = getSchemaFromResponse(methodSpecification.responses[200]);
  if (schema) {
    var modelName = getModelNameFromSchema(schema);
    if (modelName) {
      return createMockGenerator({
        importFaker: importFaker,
        model: modelName
      });
    }
    return createMockGenerator({
      importFaker: importFaker,
      schema: schema
    });
  }

  return null;
};

var createGetExample = function createGetExample(_ref4) {
  var methodSpecification = _ref4.methodSpecification;

  var examples = getExamplesFromMethodSpecifiction(methodSpecification);
  return function (exampleId) {
    if (!examples) {
      return _promise2.default.resolve(null);
    }

    return _promise2.default.resolve(examples[exampleId]);
  };
};

module.exports = function createEndpointFactory(_ref5) {
  var _ref5$origin = _ref5.origin,
      origin = _ref5$origin === undefined ? 'client' : _ref5$origin,
      importFaker = _ref5.importFaker;

  return function createEndpoint(_ref6) {
    var operationId = _ref6.operationId,
        rest = (0, _objectWithoutProperties3.default)(_ref6, ['operationId']);

    if (!map[operationId]) {
      throw new Error('Operation id: ' + operationId + ' unknown');
    }

    var _ref7 = map[operationId] || {},
        methodName = _ref7.methodName,
        methodSpecification = _ref7.methodSpecification,
        pathname = _ref7.pathname;

    return (0, _extends3.default)({
      getExample: createGetExample({
        methodSpecification: methodSpecification
      }),
      methodName: methodName,
      mock: createMockData({
        importFaker: importFaker,
        methodSpecification: methodSpecification
      }),

      operationId: operationId,
      pathname: pathname,
      validateBody: getBodyValidator({
        methodSpecification: methodSpecification,
        origin: origin
      }),
      validateResponse: getResponseValidator({
        methodSpecification: methodSpecification,
        origin: origin
      })
    }, rest);
  };
};