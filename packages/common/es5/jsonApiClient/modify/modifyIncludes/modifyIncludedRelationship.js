'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLog = require('../../../log');

var _require = require('../../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./modifyIncludedRelationshipItem'),
    modifyIncludedRelationshipItem = _require2.modifyIncludedRelationshipItem;

var _require3 = require('./modifyIncludedRelationshipItems'),
    modifyIncludedRelationshipItems = _require3.modifyIncludedRelationshipItems;

var dep = new Dependor({
  modifyIncludedRelationshipItem: modifyIncludedRelationshipItem,
  modifyIncludedRelationshipItems: modifyIncludedRelationshipItems
});

var defaultLog = createLog('common:jsonApiClient:modifyIncludedRelationship');

function modifyIncludedRelationship(_ref) {
  var includesToModify = _ref.includesToModify,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? defaultLog : _ref$log,
      openApiClient = _ref.openApiClient,
      parentPath = _ref.parentPath,
      relationKey = _ref.relationKey,
      relationship = _ref.relationship,
      relationshipsToModify = _ref.relationshipsToModify,
      resourcePath = _ref.resourcePath;

  return _promise2.default.resolve().then(function () {
    if (!relationship) {
      throw new Error('provide relationship');
    }

    if (relationship.data === undefined) {
      throw new Error('provide relationship.data');
    }

    var isArray = Array.isArray(relationship.data);

    if (isArray) {
      return dep.modifyIncludedRelationshipItems({
        includesToModify: includesToModify,
        items: relationship.data,
        log: log,
        openApiClient: openApiClient,
        parentPath: parentPath,
        relationKey: relationKey,
        relationshipsToModify: relationshipsToModify,
        resourcePath: resourcePath
      }).then(function (updatedItems) {
        return {
          data: updatedItems
        };
      });
    }
    return dep.modifyIncludedRelationshipItem({
      includesToModify: includesToModify,
      item: relationship.data,
      log: log.scope(parentPath + ' -> modifyIncludedRelationshipItem for ' + resourcePath),
      openApiClient: openApiClient,
      relationKey: relationKey,
      relationshipsToModify: relationshipsToModify,
      resourcePath: resourcePath
    }).then(function (updatedItem) {
      return {
        data: updatedItem
      };
    });
  });
}

module.exports = {
  dep: dep,
  modifyIncludedRelationship: modifyIncludedRelationship
};