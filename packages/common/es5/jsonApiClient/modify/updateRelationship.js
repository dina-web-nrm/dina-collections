'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schemaInterface = require('../../schemaInterface');
var createLog = require('../../log');

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var buildOperationId = require('../../buildOperationId');

var _require2 = require('./inverseUpdateRelationship'),
    inverseUpdateRelationship = _require2.inverseUpdateRelationship;

var openApiSpec = schemaInterface.getOpenApiSpec();

var dep = new Dependor({
  buildOperationId: buildOperationId
});

var defaultLog = createLog('common:jsonApiClient:updateRelationship');

var inverseOperationIdMap = {};
(0, _keys2.default)(openApiSpec.paths).forEach(function (path) {
  (0, _keys2.default)(openApiSpec.paths[path] || {}).forEach(function (verb) {
    var operation = openApiSpec.paths[path][verb];
    if (operation['x-inverseOperationId']) {
      inverseOperationIdMap[operation.operationId] = operation['x-inverseOperationId'];
    }
  });
}, {});

function updateRelationship(_ref) {
  var item = _ref.item,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? defaultLog : _ref$log,
      openApiClient = _ref.openApiClient,
      relationKey = _ref.relationKey,
      relationship = _ref.relationship,
      resourcePath = _ref.resourcePath;
  var id = item.id,
      type = item.type;
  var data = relationship.data;

  var isArray = Array.isArray(data);
  var operationId = buildOperationId({
    operationType: 'updateRelationship',
    relationKey: relationKey,
    resource: type
  });

  var inverseUpdateOperationId = inverseOperationIdMap[operationId];
  if (inverseUpdateOperationId) {
    return inverseUpdateRelationship({
      data: data,
      id: id,
      inverseUpdateOperationId: inverseUpdateOperationId,
      isArray: isArray,
      item: item,
      log: log.scope('inverse updateRelationship for ' + resourcePath + ' -> ' + item.id + ' @ key: ' + relationKey + ' with type: ' + (isArray ? 'array' : 'object')),
      openApiClient: openApiClient,
      relationKey: relationKey,
      type: type
    });
  }

  log.debug('updateRelationship for ' + resourcePath + ' -> ' + item.id + ' @ key: ' + relationKey + '. relationships: ', data);

  var request = {
    body: { data: data },
    pathParams: {
      id: id
    }
  };
  log.debug('updating with operationId: ' + operationId + ' and request:', request);

  return openApiClient.call(operationId, request);
}

module.exports = {
  dep: dep,
  updateRelationship: updateRelationship
};