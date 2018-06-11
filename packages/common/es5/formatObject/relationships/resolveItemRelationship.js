'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./utilities/getRelationshipItems'),
    getRelationshipItems = _require.getRelationshipItems;

var _require2 = require('./utilities/resolveByPath'),
    resolveByPath = _require2.resolveByPath;

var _require3 = require('./utilities/resolveRelationshipDataArray'),
    resolveRelationshipDataArray = _require3.resolveRelationshipDataArray;

var _require4 = require('./utilities/resolveRelationshipDataObject'),
    resolveRelationshipDataObject = _require4.resolveRelationshipDataObject;

module.exports = function resolveItemRelationship(_ref) {
  var coreToNested = _ref.coreToNested,
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

  return getRelationshipItems({
    getItemByTypeId: getItemByTypeId,
    relationshipKey: relationshipKey,
    relationships: relationships,
    type: type
  }).then(function (relationshipItems) {
    return _promise2.default.all(relationshipItems.map(function (relationshipItem) {
      return coreToNested({
        getItemByTypeId: getItemByTypeId,
        item: relationshipItem,
        type: relationshipItem.type
      });
    })).then(function (formattedRelationshipItems) {
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
    });
  });
};