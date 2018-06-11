"use strict";

var resolveById = function resolveById(_ref) {
  var formattedRelationshipItems = _ref.formattedRelationshipItems,
      id = _ref.id;

  if (id && formattedRelationshipItems) {
    return formattedRelationshipItems.find(function (candidateItem) {
      return candidateItem && candidateItem.id === id;
    });
  }

  return {
    id: id
  };
};

module.exports = { resolveById: resolveById };