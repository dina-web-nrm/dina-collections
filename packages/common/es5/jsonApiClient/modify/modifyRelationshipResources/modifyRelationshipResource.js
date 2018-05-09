'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLog = require('../../../log');

var _require = require('../../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./modifyRelatedResourceItem'),
    modifyRelatedResourceItem = _require2.modifyRelatedResourceItem;

var _require3 = require('./modifyRelatedResourceItems'),
    modifyRelatedResourceItems = _require3.modifyRelatedResourceItems;

var dep = new Dependor({
  modifyRelatedResourceItem: modifyRelatedResourceItem,
  modifyRelatedResourceItems: modifyRelatedResourceItems
});

var defaultLog = createLog('common:jsonApiClient:modifyRelationshipResource');

function modifyRelationshipResource(_ref) {
  var _ref$log = _ref.log,
      log = _ref$log === undefined ? defaultLog : _ref$log,
      openApiClient = _ref.openApiClient,
      relationKey = _ref.relationKey,
      relationship = _ref.relationship,
      resourcesToModify = _ref.resourcesToModify;

  return _promise2.default.resolve().then(function () {
    if (!relationship) {
      throw new Error('provide relationship');
    }

    if (relationship.data === undefined) {
      throw new Error('provide relationship.data');
    }
    var isArray = Array.isArray(relationship.data);
    log.debug(relationKey + ' (' + (isArray ? 'array' : 'object') + ')', relationship.data);
    if (isArray) {
      return dep.modifyRelatedResourceItems({
        items: relationship.data,
        log: log.scope(),
        openApiClient: openApiClient,
        relationKey: relationKey,
        resourcesToModify: resourcesToModify
      }).then(function (updatedItems) {
        return {
          data: updatedItems
        };
      });
    }
    return dep.modifyRelatedResourceItem({
      item: relationship.data,
      log: log.scope(),
      openApiClient: openApiClient,
      relationKey: relationKey,
      resourcesToModify: resourcesToModify
    }).then(function (updatedItem) {
      return {
        data: updatedItem
      };
    });
  });
}

module.exports = {
  dep: dep,
  modifyRelationshipResource: modifyRelationshipResource
};