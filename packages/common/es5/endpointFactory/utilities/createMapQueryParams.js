'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapQueryParam = function mapQueryParam(_ref) {
  var schemaInput = _ref.schema,
      key = _ref.key,
      parameterQuerySchema = _ref.parameterQuerySchema,
      queryParam = _ref.queryParam;

  var parsedQueryParam = queryParam;
  try {
    if (queryParam !== null && (typeof queryParam === 'undefined' ? 'undefined' : (0, _typeof3.default)(queryParam)) === 'object' && !Array.isArray(queryParam)) {
      return (0, _keys2.default)(queryParam).reduce(function (obj, queryParamObjectKey) {
        var schemaPath = key + '[' + queryParamObjectKey + ']';
        return (0, _extends6.default)({}, obj, (0, _defineProperty3.default)({}, queryParamObjectKey, mapQueryParam({
          parameterQuerySchema: parameterQuerySchema,
          queryParam: queryParam[queryParamObjectKey],
          schema: parameterQuerySchema[schemaPath]
        })));
      }, {});
    }

    var schema = schemaInput || parameterQuerySchema[key];

    if (!schema) {
      return queryParam;
    }

    if (!queryParam) {
      return queryParam;
    }

    var type = schema.type;


    switch (type) {
      case 'string':
        {
          if (Array.isArray(queryParam)) {
            break;
          }
          if (queryParam !== null && (typeof queryParam === 'undefined' ? 'undefined' : (0, _typeof3.default)(queryParam)) === 'object') {
            break;
          }

          parsedQueryParam = ('' + queryParam).trim();
          break;
        }

      case 'boolean':
        {
          if (queryParam === 'true') {
            parsedQueryParam = true;
          }
          if (queryParam === 'false') {
            parsedQueryParam = false;
          }
          break;
        }

      case 'integer':
        {
          if (queryParam.match(/^-{0,1}\d+$/)) {
            parsedQueryParam = parseInt(queryParam, 10);
          }

          break;
        }

      case 'array':
        {
          var array = Array.isArray(queryParam) ? queryParam : queryParam.replace('[', '').replace(']', '').split(',');
          parsedQueryParam = array.map(function (itemQueryParam) {
            return mapQueryParam({
              queryParam: itemQueryParam,
              schema: schema.items
            });
          });
          break;
        }
      default:
        {
          throw new Error('Unknown type: ' + type);
        }
    }
  } catch (err) {
    console.warn('Failed to parse queryParam ' + queryParam, err);
    throw err;
  }

  return parsedQueryParam;
};

var buildParameterQuerySchema = function buildParameterQuerySchema(_ref2) {
  var methodSpecification = _ref2.methodSpecification;

  return (methodSpecification.parameters || []).filter(function (parameter) {
    return parameter.in === 'query';
  }).reduce(function (properties, queryParameter) {
    return (0, _extends6.default)({}, properties, (0, _defineProperty3.default)({}, queryParameter.name, queryParameter.schema));
  }, {});
};

module.exports = function createMapQueryParams(_ref3) {
  var methodSpecification = _ref3.methodSpecification;

  var parameterQuerySchema = buildParameterQuerySchema({
    methodSpecification: methodSpecification
  });

  return function mapQueryParams() {
    var queryParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return (0, _keys2.default)(queryParams).reduce(function (mappedParams, key) {
      var queryParam = queryParams[key];
      return (0, _extends6.default)({}, mappedParams, (0, _defineProperty3.default)({}, key, mapQueryParam({
        key: key,
        parameterQuerySchema: parameterQuerySchema,
        queryParam: queryParam
      })));
    }, {});
  };
};