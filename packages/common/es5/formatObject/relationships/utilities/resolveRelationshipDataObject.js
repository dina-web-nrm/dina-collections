'use strict';

var objectPath = require('object-path');

var _require = require('./resolveById'),
    resolveById = _require.resolveById;

var resolveRelationshipDataObject = function resolveRelationshipDataObject(_ref) {
  var formattedRelationshipItems = _ref.formattedRelationshipItems,
      item = _ref.item,
      relationship = _ref.relationship,
      relationshipKey = _ref.relationshipKey;

  var resolvedRelation = resolveById({
    formattedRelationshipItems: formattedRelationshipItems,
    id: relationship.data.id
  });

  objectPath.set(item, relationshipKey, resolvedRelation);

  return item;
};

module.exports = { resolveRelationshipDataObject: resolveRelationshipDataObject };