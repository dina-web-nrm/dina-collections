"use strict";

var extractObjectRelationship = function extractObjectRelationship(_ref) {
  var item = _ref.item,
      relationshipKey = _ref.relationshipKey,
      relationshipType = _ref.relationshipType;

  if (item[relationshipKey] === null) {
    return null;
  }

  return item[relationshipKey] && item[relationshipKey].id ? { id: item[relationshipKey].id, type: relationshipType } : undefined;
};

module.exports = { extractObjectRelationship: extractObjectRelationship };