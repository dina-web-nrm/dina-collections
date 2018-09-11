'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../Dependor'),
    Dependor = _require.Dependor;

var createLog = require('../log');
var createOpenApiClient = require('../openApiClient');
var jsonApiGetMany = require('./get/getMany');
var jsonApiGetOne = require('./get/getOne');
var jsonApiCreate = require('./modify/recursiveCreate').recursiveCreate;
var jsonApiUpdate = require('./modify/recursiveUpdate').recursiveUpdate;

var _require2 = require('./modify/setDependencies'),
    setDependencies = _require2.setDependencies;

var log = createLog('common:jsonApiClient');

var dep = new Dependor({
  createOpenApiClient: createOpenApiClient,
  jsonApiCreate: jsonApiCreate,
  jsonApiGetMany: jsonApiGetMany,
  jsonApiGetOne: jsonApiGetOne,
  jsonApiUpdate: jsonApiUpdate
});

setDependencies();

var createJsonApiClient = function createJsonApiClient(_ref) {
  var apiConfigInput = _ref.apiConfigInput,
      createEndpoint = _ref.createEndpoint;

  var openApiClient = dep.createOpenApiClient({
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
        _userOptions$resource = userOptions.resourcesToModify,
        resourcesToModify = _userOptions$resource === undefined ? [resourceType] : _userOptions$resource;

    var item = body.data;
    return dep.jsonApiUpdate({
      item: item,
      openApiClient: openApiClient,
      resourcesToModify: resourcesToModify,
      resourceType: resourceType
    });
  };

  var create = function create(resourceType, userOptions) {
    log.debug('create ' + resourceType, userOptions);
    var _userOptions$body2 = userOptions.body,
        body = _userOptions$body2 === undefined ? {} : _userOptions$body2,
        _userOptions$resource2 = userOptions.resourcesToModify,
        resourcesToModify = _userOptions$resource2 === undefined ? [resourceType] : _userOptions$resource2;

    var item = body.data;
    return dep.jsonApiCreate({
      item: item,
      openApiClient: openApiClient,
      resourcesToModify: resourcesToModify,
      resourceType: resourceType
    });
  };

  var getOne = function getOne(resourceType, userOptions) {
    log.debug('getOne ' + resourceType, userOptions);
    return dep.jsonApiGetOne({
      openApiClient: openApiClient,
      resourceType: resourceType,
      userOptions: userOptions
    });
  };

  var getMany = function getMany(resourceType, userOptions) {
    log.debug('getMany ' + resourceType, userOptions);
    return dep.jsonApiGetMany({
      openApiClient: openApiClient,
      resourceType: resourceType,
      userOptions: userOptions
    });
  };

  return (0, _extends3.default)({}, openApiClient, {
    call: call,
    create: create,
    getMany: getMany,
    getOne: getOne,
    update: update
  });
};

module.exports = {
  createJsonApiClient: createJsonApiClient,
  dep: dep
};