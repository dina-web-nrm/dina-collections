'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildBodyParameters = function buildBodyParameters(request) {
  var description = request.description,
      name = request.name,
      schema = request.schema;


  if (name && schema) {
    return [{
      description: description,
      in: 'body',
      name: name,
      required: true,
      schema: {
        $ref: '#/definitions/' + name
      }
    }];
  }
  return [];
};

var buildPathParameters = function buildPathParameters(pathParams) {
  return (0, _keys2.default)(pathParams).map(function (name) {
    var _pathParams$name = pathParams[name],
        description = _pathParams$name.description,
        required = _pathParams$name.required,
        schema = _pathParams$name.schema;
    var type = schema.type;


    return {
      description: description,
      in: 'path',
      name: name,
      required: required,
      type: type
    };
  }, {});
};

var buildQueryParameters = function buildQueryParameters(queryParams) {
  return (0, _keys2.default)(queryParams).map(function (name) {
    var _queryParams$name = queryParams[name],
        description = _queryParams$name.description,
        required = _queryParams$name.required,
        schema = _queryParams$name.schema;
    var type = schema.type;


    return {
      description: description,
      in: 'query',
      name: name,
      required: required,
      type: type
    };
  }, {});
};

var buildHeaderParameters = function buildHeaderParameters(headerParams) {
  return (0, _keys2.default)(headerParams).map(function (name) {
    var _headerParams$name = headerParams[name],
        description = _headerParams$name.description,
        required = _headerParams$name.required,
        schema = _headerParams$name.schema;
    var type = schema.type;


    return {
      description: description,
      in: 'header',
      name: name,
      required: required,
      type: type
    };
  }, {});
};

module.exports = function buildParameters(_ref) {
  var _ref$pathParams = _ref.pathParams,
      pathParams = _ref$pathParams === undefined ? {} : _ref$pathParams,
      _ref$queryParams = _ref.queryParams,
      queryParams = _ref$queryParams === undefined ? {} : _ref$queryParams,
      _ref$headers = _ref.headers,
      headers = _ref$headers === undefined ? {} : _ref$headers,
      _ref$request = _ref.request,
      request = _ref$request === undefined ? {} : _ref$request;

  return [].concat((0, _toConsumableArray3.default)(buildBodyParameters(request)), (0, _toConsumableArray3.default)(buildPathParameters(pathParams)), (0, _toConsumableArray3.default)(buildQueryParameters(queryParams)), (0, _toConsumableArray3.default)(buildHeaderParameters(headers)));
};