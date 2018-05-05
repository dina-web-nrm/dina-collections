'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createOperationId = require('../utilities/createOperationId');
var createOperationSpecificQueryParams = require('../utilities/createOperationSpecificQueryParams');

module.exports = function runIncludeJobs(_ref) {
  var includeJobs = _ref.includeJobs,
      openApiClient = _ref.openApiClient,
      relationSpecification = _ref.relationSpecification;

  var promises = includeJobs.map(function (includeJob) {
    var path = includeJob.path,
        ids = includeJob.ids,
        type = includeJob.type;


    return openApiClient.call({
      operationId: createOperationId('getMany', type),
      queryParams: createOperationSpecificQueryParams({
        path: path,
        queryParams: {
          filter: {
            ids: ids
          }
        },
        relationSpecification: relationSpecification
      })
    }).then(function (response) {
      var items = response.data;
      return items.map(function (item) {
        return (0, _extends3.default)({}, item, {
          path: path
        });
      });
    });
  });

  return _promise2.default.all(promises).then(function (includes) {
    return [].concat((0, _toConsumableArray3.default)(includes));
  });
};