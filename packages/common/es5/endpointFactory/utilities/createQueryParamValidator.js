'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildQuerySchema = function buildQuerySchema(_ref) {
  var methodSpecification = _ref.methodSpecification;

  var properties = (methodSpecification.parameters || []).filter(function (parameter) {
    return parameter.in === 'query';
  }).reduce(function (propertySchema, queryParameter) {
    return (0, _extends5.default)({}, propertySchema, (0, _defineProperty3.default)({}, queryParameter.name, queryParameter.schema));
  }, {});

  var objectProperties = (0, _keys2.default)(properties).reduce(function (obj, rawKey) {
    var isObjectKey = rawKey.indexOf('[') > -1 && rawKey.indexOf(']') > -1;
    if (isObjectKey) {
      var objectKey = rawKey.split('[')[0];
      var valueKey = rawKey.split('[')[1].replace(']', '');

      if (!obj[objectKey]) {
        obj[objectKey] = {
          additionalProperties: false,
          properties: {},
          type: 'object'
        };
      }
      obj[objectKey].properties[valueKey] = properties[rawKey];

      return obj;
    }

    return (0, _extends5.default)({}, obj, (0, _defineProperty3.default)({}, rawKey, properties[rawKey]));
  }, {});
  return {
    additionalProperties: false,
    properties: objectProperties,
    type: 'object'
  };
};

module.exports = function createQueryValidator(_ref2) {
  var createApiClientValidator = _ref2.createApiClientValidator,
      methodSpecification = _ref2.methodSpecification;

  var querySchema = buildQuerySchema({ methodSpecification: methodSpecification });
  return createApiClientValidator({
    schema: querySchema,
    type: 'request-query'
  });
};