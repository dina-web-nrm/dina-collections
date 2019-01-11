'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLog = require('../../../log');

var _require = require('../../../Dependor'),
    Dependor = _require.Dependor;

var shouldModifyInclude = require('../../utilities/shouldModifyInclude');

var dep = new Dependor({
  shouldModifyInclude: shouldModifyInclude
});

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

var defaultLog = createLog('common:jsonApiClient:modifyIncludedRelationshipItem');

function modifyIncludedRelationshipItem() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      includesToModify = _ref2.includesToModify,
      relationshipsToModify = _ref2.relationshipsToModify,
      itemInput = _ref2.item,
      _ref2$log = _ref2.log,
      log = _ref2$log === undefined ? defaultLog : _ref2$log,
      openApiClient = _ref2.openApiClient,
      relationKey = _ref2.relationKey,
      resourcePath = _ref2.resourcePath;

  return _promise2.default.resolve().then(function () {
    if (itemInput === null) {
      log.debug('Not modifying ' + relationKey + ', it is null');
      return null;
    }

    if (!itemInput) {
      throw new Error('missing item and it is not null');
    }

    var item = itemInput;

    if (item.id) {
      if (!(item.attributes || item.relationships)) {
        log.debug('Not modifying ' + relationKey + ', id:' + item.id + '. has no attributes or relationships', item);
        return {
          id: item.id,
          type: item.type
        };
      }

      return dep.recursiveUpdate({
        includesToModify: includesToModify,
        item: item,
        log: log,
        openApiClient: openApiClient,
        relationshipsToModify: relationshipsToModify,
        resourcePath: resourcePath,
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

    return dep.recursiveCreate({
      includesToModify: includesToModify,
      item: item,
      log: log,
      openApiClient: openApiClient,
      relationshipsToModify: relationshipsToModify,
      resourcePath: resourcePath,
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
  modifyIncludedRelationshipItem: modifyIncludedRelationshipItem,
  setDependencies: setDependencies
};