"use strict";

var extractArrayRelationship = function extractArrayRelationship(_ref) {
  var item = _ref.item,
      nestedToCoreSync = _ref.nestedToCoreSync,
      relationshipKey = _ref.relationshipKey,
      relationshipType = _ref.relationshipType;

  if (!item[relationshipKey]) {
    return undefined;
  }

  var relationshipArray = item[relationshipKey].map(function (element) {
    return nestedToCoreSync ? nestedToCoreSync({
      item: element,
      normalize: true,
      type: relationshipType
    }) : element;
  }).filter(function (element) {
    return !!element;
  });

  return relationshipArray;
};

module.exports = { extractArrayRelationship: extractArrayRelationship };