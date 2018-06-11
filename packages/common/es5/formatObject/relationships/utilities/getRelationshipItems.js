'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeFalsyElements = function removeFalsyElements(element) {
  return !!element;
};
var createGetItemFromRawItemId = function createGetItemFromRawItemId(_ref) {
  var getItemByTypeId = _ref.getItemByTypeId,
      type = _ref.type;

  return function (rawItem) {
    return _promise2.default.resolve().then(function () {
      if (!rawItem || !rawItem.id) {
        return undefined;
      }

      return getItemByTypeId(type, rawItem.id);
    });
  };
};

var getRelationshipItems = function getRelationshipItems(_ref2) {
  var getItemByTypeId = _ref2.getItemByTypeId,
      relationshipKey = _ref2.relationshipKey,
      relationships = _ref2.relationships,
      type = _ref2.type;

  return _promise2.default.resolve().then(function () {
    if (!getItemByTypeId) {
      throw new Error('missing getItemByTypeId');
    }

    if (!type) {
      throw new Error('missing type');
    }

    var relationshipData = relationships[relationshipKey] && relationships[relationshipKey].data;

    if (!relationshipData) {
      return [];
    }

    var relationshipArray = Array.isArray(relationshipData) ? relationshipData : [relationshipData];

    var getItemPromiseFromRawItem = createGetItemFromRawItemId({
      getItemByTypeId: getItemByTypeId,
      type: type
    });

    return _promise2.default.all(relationshipArray.filter(removeFalsyElements).map(getItemPromiseFromRawItem)).then(function (relationshipItems) {
      return relationshipItems.filter(removeFalsyElements);
    });
  });
};

module.exports = {
  createGetItemFromRawItemId: createGetItemFromRawItemId,
  getRelationshipItems: getRelationshipItems,
  removeFalsyElements: removeFalsyElements
};