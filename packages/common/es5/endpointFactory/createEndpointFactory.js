'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildOperationIdPathnameMap = require('./utilities/buildOperationIdPathnameMap');
var createBodyValidator = require('./utilities/createBodyValidator');
var createGetExample = require('./utilities/createGetExample');
var createMock = require('./utilities/createMock');
var createQueryParamValidator = require('./utilities/createQueryParamValidator');
var createResponseValidator = require('./utilities/createResponseValidator');
var createMapQueryParams = require('./utilities/createMapQueryParams');
var openApiSpec = require('../../dist/openApi.json');

var map = buildOperationIdPathnameMap(openApiSpec);

module.exports = function createEndpointFactory(_ref) {
  var createApiClientValidator = _ref.createApiClientValidator,
      importFaker = _ref.importFaker;

  return function createEndpoint(_ref2) {
    var operationId = _ref2.operationId,
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['operationId']);

    if (!map[operationId]) {
      throw new Error('Operation id: ' + operationId + ' unknown');
    }

    var _map$operationId = map[operationId],
        methodName = _map$operationId.methodName,
        methodSpecification = _map$operationId.methodSpecification,
        pathname = _map$operationId.pathname;

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