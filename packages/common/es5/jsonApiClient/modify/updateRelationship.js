'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var openApiSpec = require('../../../dist/openApi.json');
var createLog = require('../../log');

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var buildOperationId = require('../../buildOperationId');

var dep = new Dependor({
  buildOperationId: buildOperationId
});

var defaultLog = createLog('common:jsonApiClient:updateRelationship');

var reverseOperationIdMap = {};
(0, _keys2.default)(openApiSpec.paths).forEach(function (path) {
  (0, _keys2.default)(openApiSpec.paths[path] || {}).forEach(function (verb) {
    var operation = openApiSpec.paths[path][verb];
    if (operation['x-inverseOperationId']) {
      reverseOperationIdMap[operation.operationId] = operation['x-inverseOperationId'];
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
      reverseOperationId = _ref.reverseOperationId;

  var operationId = buildOperationId({
    operationType: 'getRelationHasMany',
    relationKey: relationKey,
    resource: type
  });

  return openApiClient.call(operationId, {
    pathParams: {
      id: item.id
    }
  }).then(function (result) {
    var existingRelations = result.data;


    var relationsToRemove = existingRelations.filter(function (existingRelation) {
      return !relationItemsToUpdate.find(function (_ref2) {
        var id = _ref2.id;

        return existingRelation.id === id;
      });
    });
    log.debug('The following relationships should be removed: ', relationsToRemove);

    var promises = relationsToRemove.map(function (relationToRemove) {
      return openApiClient.call(reverseOperationId, {
        body: {
          data: null
        },
        pathParams: {
          id: relationToRemove.id
        }
      });
    });
    return _promise2.default.all(promises);
  });
};

function updateRelationship(_ref3) {
  var item = _ref3.item,
      _ref3$log = _ref3.log,
      log = _ref3$log === undefined ? defaultLog : _ref3$log,
      openApiClient = _ref3.openApiClient,
      relationKey = _ref3.relationKey,
      relationship = _ref3.relationship;
  var id = item.id,
      type = item.type;
  var data = relationship.data;

  var isArray = Array.isArray(data);
  if (isArray) {
    var _operationId = buildOperationId({
      operationType: 'updateRelationHasMany',
      relationKey: relationKey,
      resource: type
    });
    var _reverseOperationId = reverseOperationIdMap[_operationId];
    if (_reverseOperationId) {
      log.debug('reverse updateRelationship (hasMany) with ' + _reverseOperationId + ' for ' + item.type + ' -> ' + item.id + ' @ key: ' + relationKey + '. relationships: ', data);

      return deleteNotIncludedRelationships({
        item: item,
        log: log,
        openApiClient: openApiClient,
        relationItemsToUpdate: data,
        relationKey: relationKey,
        reverseOperationId: _reverseOperationId,
        type: type
      }).then(function () {
        var promises = data.map(function (relationshipItem) {
          return openApiClient.call(_reverseOperationId, {
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
      });
    }

    log.debug('updateRelationship (hasMany) for ' + item.type + ' -> ' + item.id + ' @ key: ' + relationKey + '. relationships: ', data);
    return openApiClient.call(_operationId, {
      body: { data: data },
      pathParams: {
        id: id
      }
    });
  }
  var operationId = buildOperationId({
    operationType: 'updateRelationHasOne',
    relationKey: relationKey,
    resource: type
  });

  var reverseOperationId = reverseOperationIdMap[operationId];
  if (reverseOperationId) {
    log.debug('reverse updateRelationship (hasOne) for ' + item.type + ' -> ' + item.id + ' @ key: ' + relationKey + '. relationships: ', data);

    return openApiClient.call(reverseOperationId, {
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

  log.debug('updateRelationship (hasOne) for ' + item.type + ' -> ' + item.id + ' @ key: ' + relationKey + '. relationships: ', data);

  return openApiClient.call(operationId, {
    body: { data: data },
    pathParams: {
      id: id
    }
  });
}

module.exports = {
  dep: dep,
  updateRelationship: updateRelationship
};