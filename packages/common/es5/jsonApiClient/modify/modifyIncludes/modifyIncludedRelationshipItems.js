'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLog = require('../../../log');

var _require = require('../../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./modifyIncludedRelationshipItem'),
    modifyIncludedRelationshipItem = _require2.modifyIncludedRelationshipItem;

var shouldModifyInclude = require('../../utilities/shouldModifyInclude');

var dep = new Dependor({
  modifyIncludedRelationshipItem: modifyIncludedRelationshipItem,
  shouldModifyInclude: shouldModifyInclude
});

var defaultLog = createLog('common:jsonApiClient:modifyIncludedRelationshipItems');

function modifyIncludedRelationshipItems() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      includesToModify = _ref.includesToModify,
      _ref$items = _ref.items,
      items = _ref$items === undefined ? [] : _ref$items,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? defaultLog : _ref$log,
      openApiClient = _ref.openApiClient,
      parentPath = _ref.parentPath,
      relationKey = _ref.relationKey,
      relationshipsToModify = _ref.relationshipsToModify,
      resourcePath = _ref.resourcePath;

  if (!items.length) {
    log.debug('Not modifying ' + relationKey + ', it is empty array');
  }

  return _promise2.default.all(items.map(function (item, index) {
    return dep.modifyIncludedRelationshipItem({
      includesToModify: includesToModify,
      item: item,
      log: log.scope(parentPath + ' -> modifyIncludedRelationshipItem for ' + resourcePath + ' @ index ' + index),
      openApiClient: openApiClient,
      relationKey: relationKey,
      relationshipsToModify: relationshipsToModify,
      resourcePath: resourcePath
    });
  }));
}

module.exports = {
  dep: dep,
  modifyIncludedRelationshipItems: modifyIncludedRelationshipItems
};