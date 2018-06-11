"use strict";

var extractArrayRelationship = function extractArrayRelationship(_ref) {
  var item = _ref.item,
      relationshipKey = _ref.relationshipKey,
      relationshipType = _ref.relationshipType;

  if (!item[relationshipKey]) {
    return undefined;
  }

  var relationshipArray = item[relationshipKey].map(function (element) {
    return element && element.id ? { id: element.id, type: relationshipType } : null;
  }).filter(function (element) {
    return !!element;
  });

  return relationshipArray;
};

module.exports = { extractArrayRelationship: extractArrayRelationship };