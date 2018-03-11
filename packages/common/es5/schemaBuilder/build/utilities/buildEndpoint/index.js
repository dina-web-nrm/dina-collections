'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildResponse = require('./buildResponse');
var buildRequest = require('./buildRequest');

module.exports = function buildEndpoint(_ref) {
  var _ref$auth = _ref.auth,
      auth = _ref$auth === undefined ? true : _ref$auth,
      description = _ref.description,
      method = _ref.method,
      operationId = _ref.operationId,
      path = _ref.path,
      _ref$pathParams = _ref.pathParams,
      rawPathParams = _ref$pathParams === undefined ? [] : _ref$pathParams,
      queryParams = _ref.queryParams,
      requestInput = _ref.request,
      resource = _ref.resource,
      _ref$response = _ref.response,
      responseInput = _ref$response === undefined ? {} : _ref$response,
      summary = _ref.summary,
      tags = _ref.tags;

  var pathParams = rawPathParams.reduce(function (obj, key) {
    return (0, _extends4.default)({}, obj, (0, _defineProperty3.default)({}, key, {
      description: resource + ' ' + key,
      example: '1',
      required: true,
      schema: {
        type: 'string'
      }
    }));
  }, {});

  var selfLink = path;

  var response = buildResponse((0, _extends4.default)({
    resource: resource
  }, responseInput, {
    operationId: operationId,
    selfLink: selfLink
  }));

  var request = requestInput ? buildRequest((0, _extends4.default)({
    resource: resource
  }, requestInput, {
    operationId: operationId })) : undefined;

  return {
    description: description,
    method: method,
    operationId: operationId,
    path: path,
    pathParams: pathParams,
    queryParams: queryParams,
    request: request,
    response: response,
    security: auth ? [{
      bearerAuth: []
    }] : undefined,
    summary: summary,
    tags: tags
  };
};