'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLog = require('../../log');

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./modifyRelationshipResources'),
    modifyRelationshipResources = _require2.modifyRelationshipResources;

var _require3 = require('./updateRelationships'),
    updateRelationships = _require3.updateRelationships;

var _require4 = require('./create'),
    create = _require4.create;

var dep = new Dependor({
  create: create,
  modifyRelationshipResources: modifyRelationshipResources,
  updateRelationships: updateRelationships
});

var defaultLog = createLog('common:jsonApiClient:recursiveCreate');

function recursiveCreate() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      item = _ref.item,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? defaultLog : _ref$log,
      openApiClient = _ref.openApiClient,
      resourcesToModify = _ref.resourcesToModify,
      resourceType = _ref.resourceType;

  return _promise2.default.resolve().then(function () {
    if (!openApiClient) {
      throw new Error('provide openApiClient');
    }

    if (!item) {
      throw new Error('item is required');
    }

    var attributes = item.attributes,
        id = item.id,
        relationships = item.relationships,
        type = item.type;


    if (!type) {
      throw new Error('item type is required');
    }

    if (id) {
      throw new Error('id not allowed');
    }

    if (!resourceType) {
      throw new Error('resourceType is required');
    }

    if (resourceType !== type) {
      throw new Error('wrong item type: ' + type + ' for resourceType: ' + resourceType);
    }

    log.debug('start recursiveCreate resource: ' + resourceType + '. item:', item);

    return dep.modifyRelationshipResources({
      log: log.scope(),
      openApiClient: openApiClient,
      relationships: relationships,
      resourcesToModify: resourcesToModify
    }).then(function (updatedRelationships) {
      var itemWithoutRelationships = {
        attributes: attributes,
        type: type
      };
      log.debug('modifyRelationshipResources done. itemWithoutRelationships:', itemWithoutRelationships);

      return dep.create({
        item: itemWithoutRelationships,
        log: log.scope(),
        openApiClient: openApiClient,
        resourcesToModify: resourcesToModify
      }).then(function (response) {
        var createdItem = response.data;
        log.debug('create done. createdItem:', createdItem);
        return dep.updateRelationships({
          item: createdItem,
          log: log.scope(),
          openApiClient: openApiClient,
          relationships: updatedRelationships
        }).then(function () {
          log.debug('updateRelationships done. returning:', createdItem);
          return createdItem;
        });
      });
    });
  });
}

module.exports = {
  dep: dep,
  recursiveCreate: recursiveCreate
};