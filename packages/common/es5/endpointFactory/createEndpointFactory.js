'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schemaInterface = require('../schemaInterface');
var createBodyValidator = require('./utilities/createBodyValidator');
var createGetExample = require('./utilities/createGetExample');
var createMock = require('./utilities/createMock');
var createQueryParamValidator = require('./utilities/createQueryParamValidator');
var createResponseValidator = require('./utilities/createResponseValidator');
var createMapQueryParams = require('./utilities/createMapQueryParams');

module.exports = function createEndpointFactory(_ref) {
  var createApiClientValidator = _ref.createApiClientValidator,
      importFaker = _ref.importFaker;

  return function createEndpoint(_ref2) {
    var operationId = _ref2.operationId,
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['operationId']);

    var openApiSpec = schemaInterface.getOpenApiSpec();

    var _schemaInterface$getM = schemaInterface.getMethodByOperationId(operationId),
        methodName = _schemaInterface$getM.methodName,
        methodSpecification = _schemaInterface$getM.methodSpecification,
        pathname = _schemaInterface$getM.pathname;

    return (0, _extends3.default)({
      getExample: createGetExample({
        methodSpecification: methodSpecification,
        openApiSpec: openApiSpec
      }),
      mapQueryParams: createMapQueryParams({ methodSpecification: methodSpecification }),
      methodName: methodName,
      mock: createMock({
        importFaker: importFaker,
        methodSpecification: methodSpecification
      }),

      operationId: operationId,
      pathname: pathname,
      validateBody: createBodyValidator({
        createApiClientValidator: createApiClientValidator,
        methodSpecification: methodSpecification
      }),
      validateQueryParams: createQueryParamValidator({
        createApiClientValidator: createApiClientValidator,
        methodSpecification: methodSpecification
      }),
      validateResponse: createResponseValidator({
        createApiClientValidator: createApiClientValidator,
        methodSpecification: methodSpecification
      })
    }, rest);
  };
};