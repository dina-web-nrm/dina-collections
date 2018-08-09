'use strict';

var objectPath = require('object-path');

var _require = require('./resolveById'),
    resolveById = _require.resolveById;

var resolveRelationshipDataArray = function resolveRelationshipDataArray(_ref) {
  var formattedRelationshipItems = _ref.formattedRelationshipItems,
      item = _ref.item,
      relationship = _ref.relationship,
      relationshipKey = _ref.relationshipKey;

  var resolvedRelations = relationship.data.map(function (_ref2) {
    var id = _ref2.id;

    return resolveById({
      formattedRelationshipItems: formattedRelationshipItems,
      id: id
    });
  });

  objectPath.set(item, relationshipKey, resolvedRelations);

  return item;
};

module.exports = { resolveRelationshipDataArray: resolveRelationshipDataArray };