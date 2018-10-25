"use strict";

var extractObjectRelationship = function extractObjectRelationship(_ref) {
  var item = _ref.item,
      nestedToCoreSync = _ref.nestedToCoreSync,
      relationshipKey = _ref.relationshipKey,
      relationshipType = _ref.relationshipType;

  if (item[relationshipKey] === null) {
    return null;
  }

  if (!item[relationshipKey]) {
    return undefined;
  }

  return nestedToCoreSync ? nestedToCoreSync({
    item: item[relationshipKey],
    normalize: true,
    type: relationshipType
  }) : item[relationshipKey];
};

module.exports = { extractObjectRelationship: extractObjectRelationship };