'use strict';

var createLog = require('../log');
var createOpenApiClient = require('../openApiClient');
var jsonApiGetMany = require('./get/getMany');
var jsonApiGetOne = require('./get/getOne');
var jsonApiCreate = require('./modify/recursiveCreate').recursiveCreate;
var jsonApiUpdate = require('./modify/recursiveUpdate').recursiveUpdate;
var setDependencies = require('./modify/setDependencies').setDependencies;

var log = createLog('common:jsonApiClient');

setDependencies();

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
    var _userOptions$body = userOptions.body,
        body = _userOptions$body === undefined ? {} : _userOptions$body;

    var item = body.data;
    return jsonApiUpdate({
      item: item,
      openApiClient: openApiClient,
      resourceType: resourceType
    });
  };

  var create = function create(resourceType, userOptions) {
    log.debug('create ' + resourceType, userOptions);
    var _userOptions$body2 = userOptions.body,
        body = _userOptions$body2 === undefined ? {} : _userOptions$body2;

    var item = body.data;
    return jsonApiCreate({
      item: item,
      openApiClient: openApiClient,
      resourceType: resourceType
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