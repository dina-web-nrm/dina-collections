'use strict';

var createLog = require('../log');
var createOpenApiClient = require('../openApiClient');
var jsonApiGetMany = require('./get/getMany');
var jsonApiGetOne = require('./get/getOne');
var jsonApiCreate = require('./create/create').create;
var jsonApiUpdate = require('./create/update');

var log = createLog('common:jsonApiClient');

module.exports = function createJsonApiClient(_ref) {
  var apiConfigInput = _ref.apiConfigInput,
      createEndpoint = _ref.createEndpoint;

  var openApiClient = createOpenApiClient({
    apiConfigInput: apiConfigInput,
    createEndpoint: createEndpoint
  });

  var call = function call() {
    log.debug('call called forward to openApiClient');
    return openApiClient.call.apply(openApiClient, arguments);
  };

  var update = function update(resourceType, userOptions) {
    log.debug('update ' + resourceType, userOptions);
    return jsonApiUpdate({
      openApiClient: openApiClient,
      resourceType: resourceType,
      userOptions: userOptions
    });
  };

  var create = function create(resourceType, userOptions) {
    log.debug('create ' + resourceType, userOptions);
    return jsonApiCreate({
      openApiClient: openApiClient,
      resourceType: resourceType,
      userOptions: userOptions
    });
  };

  var getOne = function getOne(resourceType, userOptions) {
    log.debug('getOne ' + resourceType, userOptions);
    return jsonApiGetOne({
      openApiClient: openApiClient,
      resourceType: resourceType,
      userOptions: userOptions
    });
  };

  var getMany = function getMany(resourceType, userOptions) {
    log.debug('getMany ' + resourceType, userOptions);
    return jsonApiGetMany({
      openApiClient: openApiClient,
      resourceType: resourceType,
      userOptions: userOptions
    });
  };

  return {
    call: call,
    create: create,
    getMany: getMany,
    getOne: getOne,
    update: update
  };
};