'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildOperationId = require('../../buildOperationId');
var createOperationSpecificQueryParams = require('../utilities/createOperationSpecificQueryParams');
var createRelationSpecification = require('../utilities/createRelationSpecification');
var fetchIncluded = require('./fetchIncluded');

module.exports = function getOne(_ref) {
  var openApiClient = _ref.openApiClient,
      resourceType = _ref.resourceType,
      userOptions = _ref.userOptions;
  var queryParams = userOptions.queryParams,
      pathParams = userOptions.pathParams;

  var relationSpecification = createRelationSpecification(queryParams);

  return openApiClient.call(buildOperationId({
    operationType: 'getOne',
    resource: resourceType
  }), {
    pathParams: pathParams,
    queryParams: createOperationSpecificQueryParams({
      path: '.',
      queryParams: queryParams,
      relationSpecification: relationSpecification
    })
  }).then(function (response) {
    return fetchIncluded({
      items: [response.data],
      openApiClient: openApiClient,
      relationSpecification: relationSpecification
    }).then(function (included) {
      return (0, _extends3.default)({}, response, {
        included: included
      });
    });
  });
};