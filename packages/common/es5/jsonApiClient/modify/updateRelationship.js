'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schemaInterface = require('../../schemaInterface');
var createLog = require('../../log');

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var buildOperationId = require('../../buildOperationId');

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

var deleteNotIncludedRelationships = function deleteNotIncludedRelationships(_ref) {
  var item = _ref.item,
      log = _ref.log,
      openApiClient = _ref.openApiClient,
      relationItemsToUpdate = _ref.relationItemsToUpdate,
      relationKey = _ref.relationKey,
      type = _ref.type,
      inverseOperationId = _ref.inverseOperationId;

  var getRelationshipOperationId = buildOperationId({
    operationType: 'getRelationship',
    relationKey: relationKey,
    resource: type
  });
  var inverseGetOperationId = inverseOperationIdMap[getRelationshipOperationId];

  return openApiClient.call(inverseGetOperationId || getRelationshipOperationId, {
    pathParams: {
      id: item.id
    }
  }).then(function (result) {
    var existingRelations = result.data;


    if (existingRelations) {
      var existingRelationsArray = Array.isArray(existingRelations) ? existingRelations : [existingRelations];

      var relationItemsToUpdateArray = Array.isArray(relationItemsToUpdate) ? relationItemsToUpdate : [relationItemsToUpdate];

      var relationsToRemove = existingRelationsArray.filter(function (_ref2) {
        var existingId = _ref2.id;

        var isPreexisting = relationItemsToUpdateArray.find(function (_ref3) {
          var id = _ref3.id;

          return id === existingId;
        });

        return !isPreexisting;
      });

      if (relationsToRemove.length) {
        log.debug('The following ' + relationKey + ' should be removed:', relationsToRemove);

        var updateRelationshipOperationId = buildOperationId({
          operationType: 'updateRelationship',
          relationKey: relationKey,
          resource: type
        });

        var promises = relationsToRemove.map(function (relationToRemove) {
          return openApiClient.call(inverseOperationId || updateRelationshipOperationId, {
            body: {
              data: null
            },
            pathParams: {
              id: relationToRemove.id || item.id
            }
          });
        });
        return _promise2.default.all(promises);
      }

      log.debug('Nothing to remove for ' + relationKey);
      return _promise2.default.resolve();
    }

    log.debug('No existing relations for ' + relationKey);
    return _promise2.default.resolve({ data: null });
  });
};

function updateRelationship(_ref4) {
  var item = _ref4.item,
      _ref4$log = _ref4.log,
      log = _ref4$log === undefined ? defaultLog : _ref4$log,
      openApiClient = _ref4.openApiClient,
      relationKey = _ref4.relationKey,
      relationship = _ref4.relationship,
      resourcePath = _ref4.resourcePath;
  var id = item.id,
      type = item.type;
  var data = relationship.data;

  var isArray = Array.isArray(data);
  var operationId = buildOperationId({
    operationType: 'updateRelationship',
    relationKey: relationKey,
    resource: type
  });
  var inverseOperationId = inverseOperationIdMap[operationId];
  if (inverseOperationId) {
    log.debug('inverse updateRelationship with ' + inverseOperationId + ' for ' + resourcePath + ' -> ' + item.id + ' @ key: ' + relationKey + '. relationships: ', data);

    return deleteNotIncludedRelationships({
      inverseOperationId: inverseOperationId,
      isArray: isArray,
      item: item,
      log: log,
      openApiClient: openApiClient,
      relationItemsToUpdate: data,
      relationKey: relationKey,
      type: type
    }).then(function (removedRelationships) {
      log.debug('inverse updateRelationship for ' + resourcePath + ' -> ' + item.id + ' @ key: ' + relationKey + '. relationships: ', data);
      if (isArray) {
        var promises = data.map(function (relationshipItem) {
          return openApiClient.call(inverseOperationId, {
            body: {
              data: {
                id: id,
                type: type
              }
            },
            pathParams: {
              id: relationshipItem.id
            }
          });
        });
        return _promise2.default.all(promises);
      }

      if (data && data.id) {
        return openApiClient.call(inverseOperationId, {
          body: {
            data: {
              id: id,
              type: type
            }
          },
          pathParams: {
            id: data.id
          }
        });
      }

      return removedRelationships;
    });
  }

  return deleteNotIncludedRelationships({
    inverseOperationId: inverseOperationId,
    isArray: isArray,
    item: item,
    log: log,
    openApiClient: openApiClient,
    relationItemsToUpdate: data,
    relationKey: relationKey,
    type: type
  }).then(function () {
    log.debug('updateRelationship for ' + resourcePath + ' -> ' + item.id + ' @ key: ' + relationKey + '. relationships: ', data);
    return openApiClient.call(operationId, {
      body: { data: data },
      pathParams: {
        id: id
      }
    });
  });
}

module.exports = {
  dep: dep,
  updateRelationship: updateRelationship
};