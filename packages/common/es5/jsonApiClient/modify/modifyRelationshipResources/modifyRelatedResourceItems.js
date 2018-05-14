'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLog = require('../../../log');

var _require = require('../../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./modifyRelatedResourceItem'),
    modifyRelatedResourceItem = _require2.modifyRelatedResourceItem;

var dep = new Dependor({
  modifyRelatedResourceItem: modifyRelatedResourceItem
});

var defaultLog = createLog('common:jsonApiClient:modifyRelatedResourceItems');

function modifyRelatedResourceItems() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$items = _ref.items,
      items = _ref$items === undefined ? [] : _ref$items,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? defaultLog : _ref$log,
      openApiClient = _ref.openApiClient,
      relationKey = _ref.relationKey,
      resourcesToModify = _ref.resourcesToModify;

  return _promise2.default.all(items.map(function (item) {
    return dep.modifyRelatedResourceItem({
      item: item,
      log: log,
      openApiClient: openApiClient,
      relationKey: relationKey,
      resourcesToModify: resourcesToModify
    });
  }));
}

module.exports = {
  dep: dep,
  modifyRelatedResourceItems: modifyRelatedResourceItems
};