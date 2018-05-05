'use strict';

var createOpenApiClient = require('../openApiClient');
var jsonApiGetMany = require('./get/getMany');
var jsonApiGetOne = require('./get/getOne');

module.exports = function createJsonApiClient(_ref) {
  var apiConfigInput = _ref.apiConfigInput,
      createEndpoint = _ref.createEndpoint;

  var openApiClient = createOpenApiClient({
    apiConfigInput: apiConfigInput,
    createEndpoint: createEndpoint
  });

  var call = function call() {
    return openApiClient.call.apply(openApiClient, arguments);
  };

  var getOneOfResourceType = function getOneOfResourceType(resourceType, userOptions) {
    return jsonApiGetOne({
      openApiClient: openApiClient,
      resourceType: resourceType,
      userOptions: userOptions
    });
  };

  var getManyOfResourceType = function getManyOfResourceType(resourceType, userOptions) {
    return jsonApiGetMany({
      openApiClient: openApiClient,
      resourceType: resourceType,
      userOptions: userOptions
    });
  };

  return {
    call: call,
    getManyOfResourceType: getManyOfResourceType,
    getOneOfResourceType: getOneOfResourceType
  };
};