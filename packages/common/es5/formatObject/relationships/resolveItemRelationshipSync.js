'use strict';

var _require = require('./utilities/getRelationshipItemsSync'),
    getRelationshipItemsSync = _require.getRelationshipItemsSync;

var _require2 = require('./utilities/resolveByPath'),
    resolveByPath = _require2.resolveByPath;

var _require3 = require('./utilities/resolveRelationshipDataArray'),
    resolveRelationshipDataArray = _require3.resolveRelationshipDataArray;

var _require4 = require('./utilities/resolveRelationshipDataObject'),
    resolveRelationshipDataObject = _require4.resolveRelationshipDataObject;

module.exports = function resolveItemRelationshipSync(_ref) {
  var coreToNestedSync = _ref.coreToNestedSync,
      getItemByTypeId = _ref.getItemByTypeId,
      item = _ref.item,
      path = _ref.path,
      relationshipKey = _ref.relationshipKey,
      relationships = _ref.relationships,
      type = _ref.type;

  var relationship = relationships[relationshipKey];

  if (!(relationship && relationship.data)) {
    return item;
  }

  var relationshipItems = getRelationshipItemsSync({
    getItemByTypeId: getItemByTypeId,
    relationshipKey: relationshipKey,
    relationships: relationships,
    type: type
  });

  var formattedRelationshipItems = relationshipItems.map(function (relationshipItem) {
    return coreToNestedSync({
      getItemByTypeId: getItemByTypeId,
      item: relationshipItem,
      type: relationshipItem.type
    });
  });

  if (path) {
    return resolveByPath({
      formattedRelationshipItems: formattedRelationshipItems,
      item: item,
      path: path
    });
  }

  if (Array.isArray(relationship.data)) {
    return resolveRelationshipDataArray({
      formattedRelationshipItems: formattedRelationshipItems,
      item: item,
      relationship: relationship,
      relationshipKey: relationshipKey
    });
  }

  return resolveRelationshipDataObject({
    formattedRelationshipItems: formattedRelationshipItems,
    item: item,
    relationship: relationship,
    relationshipKey: relationshipKey
  });
};