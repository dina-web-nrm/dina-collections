'use strict';

var createLog = require('../log');
var createOpenApiClient = require('../openApiClient');
var jsonApiGetMany = require('./get/getMany');
var jsonApiGetOne = require('./get/getOne');
var jsonApiCreate = require('./modify/recursiveCreate').recursiveCreate;
var jsonApiUpdate = require('./modify/recursiveUpdate').recursiveUpdate;

var _require = require('./modify/setDependencies'),
    setDependencies = _require.setDependencies;

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
        body = _userOptions$body === undefined ? {} : _userOptions$body,
        relationshipKeysToIncludeInBody = userOptions.relationshipKeysToIncludeInBody,
        _userOptions$resource = userOptions.resourcesToModify,
        resourcesToModify = _userOptions$resource === undefined ? [resourceType] : _userOptions$resource;

    var item = body.data;
    return jsonApiUpdate({
      item: item,
      openApiClient: openApiClient,
      relationshipKeysToIncludeInBody: relationshipKeysToIncludeInBody,
      resourcesToModify: resourcesToModify,
      resourceType: resourceType
    });
  };

  var create = function create(resourceType, userOptions) {
    log.debug('create ' + resourceType, userOptions);
    var _userOptions$body2 = userOptions.body,
        body = _userOptions$body2 === undefined ? {} : _userOptions$body2,
        relationshipKeysToIncludeInBody = userOptions.relationshipKeysToIncludeInBody,
        _userOptions$resource2 = userOptions.resourcesToModify,
        resourcesToModify = _userOptions$resource2 === undefined ? [resourceType] : _userOptions$resource2;

    var item = body.data;
    return jsonApiCreate({
      item: item,
      openApiClient: openApiClient,
      relationshipKeysToIncludeInBody: relationshipKeysToIncludeInBody,
      resourcesToModify: resourcesToModify,
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