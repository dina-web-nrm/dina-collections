'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLog = require('../../../log');

var _require = require('../../../Dependor'),
    Dependor = _require.Dependor;

var dep = new Dependor({});

var setDependencies = function setDependencies() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      injectedRecursiveCreate = _ref.recursiveCreate,
      injectedRecursiveUpdate = _ref.recursiveUpdate;

  if (!injectedRecursiveCreate) {
    throw new Error('recursiveCreate is required');
  }

  if (!injectedRecursiveUpdate) {
    throw new Error('recursiveUpdate is required');
  }

  dep.add({
    recursiveCreate: injectedRecursiveCreate,
    recursiveUpdate: injectedRecursiveUpdate
  });
};

var defaultLog = createLog('common:jsonApiClient:modifyRelatedResourceItem');

function modifyRelatedResourceItem() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      itemInput = _ref2.item,
      _ref2$log = _ref2.log,
      log = _ref2$log === undefined ? defaultLog : _ref2$log,
      openApiClient = _ref2.openApiClient,
      relationKey = _ref2.relationKey,
      resourcesToModify = _ref2.resourcesToModify;

  return _promise2.default.resolve().then(function () {
    if (itemInput === null) {
      log.debug('Not updating relation: ' + relationKey + ', it is null');
      return null;
    }

    if (!itemInput) {
      throw new Error('missing item and it is not null');
    }

    var item = itemInput;

    if (!resourcesToModify.includes(itemInput.type)) {
      return {
        id: itemInput.id,
        type: itemInput.type
      };
    }

    if (item.id) {
      if (!(item.attributes || item.relationships)) {
        log.debug('Not updating relation: ' + relationKey + ', id:' + item.id + '. has no attributes or relationships', item);
        return {
          id: item.id,
          type: item.type
        };
      }
      log.debug('Recursive updating relation: ' + relationKey + ', id:' + item.id, item);
      return dep.recursiveUpdate({
        item: item,
        log: log.scope(),
        openApiClient: openApiClient,
        resourcesToModify: resourcesToModify,
        resourceType: item.type
      }).then(function (response) {
        var updatedItem = response.data;
        var id = updatedItem.id,
            type = updatedItem.type;

        return {
          id: id,
          type: type
        };
      });
    }

    log.debug('Recursive creating relation: ' + relationKey, item);

    return dep.recursiveCreate({
      item: item,
      log: log.scope(),
      openApiClient: openApiClient,
      resourcesToModify: resourcesToModify,
      resourceType: item.type
    }).then(function (response) {
      var createdItem = response.data;
      var id = createdItem.id,
          type = createdItem.type;

      return {
        id: id,
        type: type
      };
    });
  });
}

module.exports = {
  dep: dep,
  modifyRelatedResourceItem: modifyRelatedResourceItem,
  setDependencies: setDependencies
};