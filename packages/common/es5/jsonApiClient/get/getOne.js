'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLog = require('../../log');
var buildOperationId = require('../../buildOperationId');
var createOperationSpecificQueryParams = require('../utilities/createOperationSpecificQueryParams');
var createRelationSpecification = require('../utilities/createRelationSpecification');
var fetchIncluded = require('./fetchIncluded');

var defaultLog = createLog('common:jsonApiClient:getOne');
module.exports = function getOne(_ref) {
  var openApiClient = _ref.openApiClient,
      resourceType = _ref.resourceType,
      userOptions = _ref.userOptions,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? defaultLog : _ref$log;
  var queryParams = userOptions.queryParams,
      pathParams = userOptions.pathParams;


  log.debug('getOne: start. id: ' + pathParams.id + ' queryParams:', queryParams);

  var relationSpecification = createRelationSpecification(queryParams);
  var mappedQueryParams = createOperationSpecificQueryParams({
    path: '.',
    queryParams: queryParams,
    relationSpecification: relationSpecification
  });

  return openApiClient.call(buildOperationId({
    operationType: 'getOne',
    resource: resourceType
  }), {
    pathParams: pathParams,
    queryParams: mappedQueryParams
  }).then(function (response) {
    return fetchIncluded({
      items: [response.data],
      openApiClient: openApiClient,
      relationSpecification: relationSpecification
    }).then(function (included) {
      return (0, _extends3.default)({}, response, {
        included: included.map(function (item) {
          delete item.path;
          return item;
        })
      });
    });
  });
};