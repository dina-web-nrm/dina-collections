'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLog = require('../../log');

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./modifyIncludes'),
    modifyIncludes = _require2.modifyIncludes;

var _require3 = require('./updateWithRelationships'),
    updateWithRelationships = _require3.updateWithRelationships;

var _require4 = require('./updateRelationships'),
    updateRelationships = _require4.updateRelationships;

var dep = new Dependor({
  modifyIncludes: modifyIncludes,
  updateRelationships: updateRelationships,
  updateWithRelationships: updateWithRelationships
});

var defaultLog = createLog('common:jsonApiClient:recursiveUpdate');

function recursiveUpdate() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      includesToModify = _ref.includesToModify,
      item = _ref.item,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? defaultLog : _ref$log,
      openApiClient = _ref.openApiClient,
      relationshipsToModify = _ref.relationshipsToModify,
      resourcePathInput = _ref.resourcePath,
      resourceType = _ref.resourceType;

  return _promise2.default.resolve().then(function () {
    if (!openApiClient) {
      throw new Error('provide openApiClient');
    }

    if (!item) {
      throw new Error('item is required');
    }

    var id = item.id,
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

    var resourcePath = resourcePathInput || resourceType;

    log.debug(resourcePath + ' -> recursiveUpdate, id: ' + item.id, item);

    return dep.modifyIncludes({
      includesToModify: includesToModify,
      log: log.scope(resourcePath + ' -> modifyIncludes'),
      openApiClient: openApiClient,
      relationships: relationships,
      relationshipsToModify: relationshipsToModify,
      resourcePath: resourcePath
    }).then(function (updatedRelationships) {
      var itemWithUpdatedRelationships = (0, _extends3.default)({}, item, {
        relationships: updatedRelationships
      });

      return dep.updateWithRelationships({
        item: itemWithUpdatedRelationships,
        log: log.scope(resourcePath + ' -> updateWithRelationships'),
        openApiClient: openApiClient,
        relationshipsToModify: relationshipsToModify,
        resourcePath: resourcePath
      }).then(function (result) {
        return result;
      });
    });
  });
}

module.exports = {
  dep: dep,
  recursiveUpdate: recursiveUpdate
};