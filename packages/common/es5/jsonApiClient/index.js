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
var jsonApiDel = require('./modify/del').del;
var jsonApiCreate = require('./modify/recursiveCreate').recursiveCreate;
var jsonApiUpdate = require('./modify/recursiveUpdate').recursiveUpdate;

var _require2 = require('./modify/setDependencies'),
    setDependencies = _require2.setDependencies;

var log = createLog('common:jsonApiClient');

var dep = new Dependor({
  createOpenApiClient: createOpenApiClient,
  jsonApiCreate: jsonApiCreate,
  jsonApiDel: jsonApiDel,
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
        _userOptions$relation = userOptions.relationshipsToModify,
        relativeRelationshipsToModify = _userOptions$relation === undefined ? [] : _userOptions$relation,
        _userOptions$includes = userOptions.includesToModify,
        relativeIncludesToModify = _userOptions$includes === undefined ? [] : _userOptions$includes;


    var item = body.data;
    var updateTreeLog = log.tree('update ' + resourceType + ' id: ' + item.id);
    var relationshipsToModify = !relativeRelationshipsToModify.length ? ['all'] : relativeRelationshipsToModify.map(function (rel) {
      return resourceType + '.' + rel;
    });
    var includesToModify = relativeIncludesToModify.map(function (rel) {
      return resourceType + '.' + rel;
    });

    return dep.jsonApiUpdate({
      includesToModify: includesToModify,
      item: item,
      log: updateTreeLog,
      openApiClient: openApiClient,
      relationshipsToModify: relationshipsToModify,
      resourceType: resourceType
    }).then(function (res) {
      updateTreeLog.print();
      return res;
    }).catch(function (err) {
      updateTreeLog.print();
      throw err;
    });
  };

  var create = function create(resourceType, userOptions) {
    log.debug('create ' + resourceType, userOptions);
    var _userOptions$body2 = userOptions.body,
        body = _userOptions$body2 === undefined ? {} : _userOptions$body2,
        _userOptions$relation2 = userOptions.relationshipsToModify,
        relativeRelationshipsToModify = _userOptions$relation2 === undefined ? [] : _userOptions$relation2,
        _userOptions$includes2 = userOptions.includesToModify,
        relativeIncludesToModify = _userOptions$includes2 === undefined ? [] : _userOptions$includes2;

    var item = body.data;
    var createTreeLog = log.tree('create ' + resourceType);
    var relationshipsToModify = !relativeRelationshipsToModify.length ? ['all'] : relativeRelationshipsToModify.map(function (rel) {
      return resourceType + '.' + rel;
    });
    var includesToModify = relativeIncludesToModify.map(function (rel) {
      return resourceType + '.' + rel;
    });

    return dep.jsonApiCreate({
      includesToModify: includesToModify,
      item: item,
      log: createTreeLog,
      openApiClient: openApiClient,
      relationshipsToModify: relationshipsToModify,
      resourceType: resourceType
    }).then(function (res) {
      createTreeLog.print();
      return res;
    }).catch(function (err) {
      createTreeLog.print();
      throw err;
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

  var del = function del(resourceType, userOptions) {
    log.debug('del ' + resourceType, userOptions);
    return dep.jsonApiDel({
      openApiClient: openApiClient,
      resourceType: resourceType,
      userOptions: userOptions
    });
  };

  return (0, _extends3.default)({}, openApiClient, {
    call: call,
    create: create,
    del: del,
    getMany: getMany,
    getOne: getOne,
    update: update
  });
};

module.exports = {
  createJsonApiClient: createJsonApiClient,
  dep: dep
};