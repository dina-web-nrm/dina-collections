'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var buildOperationId = require('../../buildOperationId');

var dep = new Dependor({
  buildOperationId: buildOperationId
});

var deleteNotIncludedRelationships = function deleteNotIncludedRelationships(_ref) {
  var inverseUpdateOperationId = _ref.inverseUpdateOperationId,
      item = _ref.item,
      log = _ref.log,
      openApiClient = _ref.openApiClient,
      relationItemsToUpdate = _ref.relationItemsToUpdate,
      relationKey = _ref.relationKey,
      type = _ref.type;

  var getRelationshipOperationId = buildOperationId({
    operationType: 'getRelationship',
    relationKey: relationKey,
    resource: type
  });

  var request = {
    pathParams: {
      id: item.id
    }
  };
  log.debug('Fetching current relationships with getRelationshipOperationId: ' + getRelationshipOperationId, request);
  return openApiClient.call(getRelationshipOperationId, request).then(function (result) {
    var existingRelations = result.data;

    if (!existingRelations) {
      log.debug('No existing relations for ' + relationKey);
      return _promise2.default.resolve({ data: null });
    }

    log.debug('Got existing relations:', existingRelations);

    var existingRelationsArray = Array.isArray(existingRelations) ? existingRelations : [existingRelations];

    var relationItemsToUpdateArray = Array.isArray(relationItemsToUpdate) ? relationItemsToUpdate : [relationItemsToUpdate];

    var relationsToRemove = existingRelationsArray.filter(function (_ref2) {
      var existingId = _ref2.id;

      var existInUpdate = relationItemsToUpdateArray.find(function (_ref3) {
        var id = _ref3.id;

        return id === existingId;
      });
      if (existInUpdate) {
        log.debug('Not removing current relation id: ' + existingId + '. Exist in update');
      }

      return !existInUpdate;
    });

    if (relationsToRemove.length) {
      log.debug('The following ' + relationKey + ' should be removed:', relationsToRemove);

      var promises = relationsToRemove.map(function (relationToRemove) {
        var updateRequest = {
          body: {
            data: null
          },
          pathParams: {
            id: relationToRemove.id
          }
        };

        log.debug('Removing relation with inverseUpdateOperationId: ' + inverseUpdateOperationId, updateRequest);

        return openApiClient.call(inverseUpdateOperationId, updateRequest);
      });
      return _promise2.default.all(promises);
    }

    log.debug('Nothing to remove for ' + relationKey);
    return _promise2.default.resolve();
  });
};

function inverseUpdateRelationship(_ref4) {
  var data = _ref4.data,
      id = _ref4.id,
      inverseUpdateOperationId = _ref4.inverseUpdateOperationId,
      isArray = _ref4.isArray,
      item = _ref4.item,
      log = _ref4.log,
      openApiClient = _ref4.openApiClient,
      relationKey = _ref4.relationKey,
      type = _ref4.type;

  return deleteNotIncludedRelationships({
    inverseUpdateOperationId: inverseUpdateOperationId,
    isArray: isArray,
    item: item,
    log: log.scope('Deleting not included relationships'),
    openApiClient: openApiClient,
    relationItemsToUpdate: data,
    relationKey: relationKey,
    type: type
  }).then(function (removedRelationships) {
    if (isArray) {
      var promises = data.map(function (relationshipItem) {
        var request = {
          body: {
            data: {
              id: id,
              type: type
            }
          },
          pathParams: {
            id: relationshipItem.id
          }
        };
        log.debug('updating with inverseOperationId: ' + inverseUpdateOperationId + ' and request:', request);
        return openApiClient.call(inverseUpdateOperationId, request);
      });
      return _promise2.default.all(promises);
    }

    if (data && data.id) {
      var request = {
        body: {
          data: {
            id: id,
            type: type
          }
        },
        pathParams: {
          id: data.id
        }
      };
      log.debug('updating with inverseOperationId: ' + inverseUpdateOperationId + ' and request:', request);
      return openApiClient.call(inverseUpdateOperationId, request);
    }

    return removedRelationships;
  });
}

module.exports = {
  dep: dep,
  inverseUpdateRelationship: inverseUpdateRelationship
};