'use strict';

var removeFalsyElements = function removeFalsyElements(element) {
  return !!element;
};
var createGetItemFromRawItemId = function createGetItemFromRawItemId(_ref) {
  var getItemByTypeId = _ref.getItemByTypeId,
      type = _ref.type;

  return function (rawItem) {
    if (!rawItem || !rawItem.id) {
      return undefined;
    }

    return getItemByTypeId(type, rawItem.id);
  };
};

var getRelationshipItemsSync = function getRelationshipItemsSync(_ref2) {
  var getItemByTypeId = _ref2.getItemByTypeId,
      relationshipKey = _ref2.relationshipKey,
      relationships = _ref2.relationships,
      type = _ref2.type;

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

  var getItemFromRawItem = createGetItemFromRawItemId({
    getItemByTypeId: getItemByTypeId,
    type: type
  });

  return relationshipArray.filter(removeFalsyElements).map(getItemFromRawItem).filter(removeFalsyElements);
};

module.exports = {
  createGetItemFromRawItemId: createGetItemFromRawItemId,
  getRelationshipItemsSync: getRelationshipItemsSync,
  removeFalsyElements: removeFalsyElements
};