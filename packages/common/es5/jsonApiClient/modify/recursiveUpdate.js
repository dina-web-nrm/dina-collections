'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLog = require('../../log');

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./modifyRelationshipResources'),
    modifyRelationshipResources = _require2.modifyRelationshipResources;

var _require3 = require('./update'),
    update = _require3.update;

var _require4 = require('./updateRelationships'),
    updateRelationships = _require4.updateRelationships;

var dep = new Dependor({
  modifyRelationshipResources: modifyRelationshipResources,
  update: update,
  updateRelationships: updateRelationships
});

var defaultLog = createLog('common:jsonApiClient:recursiveUpdate');

function recursiveUpdate() {
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

    if (!id) {
      throw new Error('id is required');
    }

    if (!resourceType) {
      throw new Error('resourceType is required');
    }

    if (resourceType !== type) {
      throw new Error('wrong item type: ' + type + ' for resourceType: ' + resourceType);
    }

    log.debug('recursiveUpdate resource: ' + resourceType + '. item:', item);

    return dep.modifyRelationshipResources({
      log: log.scope(),
      openApiClient: openApiClient,
      relationships: relationships,
      resourcesToModify: resourcesToModify
    }).then(function (updatedRelationships) {
      var itemWithoutRelationships = {
        attributes: attributes,
        id: id,
        type: type
      };

      return dep.update({
        item: itemWithoutRelationships,
        log: log.scope(),
        openApiClient: openApiClient,
        resourcesToModify: resourcesToModify
      }).then(function (response) {
        var updatedItem = response.data;
        return dep.updateRelationships({
          item: updatedItem,
          log: log.scope(),
          openApiClient: openApiClient,
          relationships: updatedRelationships
        }).then(function () {
          return updatedItem;
        });
      });
    });
  });
}

module.exports = {
  dep: dep,
  recursiveUpdate: recursiveUpdate
};