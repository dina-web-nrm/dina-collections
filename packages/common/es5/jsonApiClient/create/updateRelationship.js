"use strict";

module.exports = function updateRelationship(_ref) {
  var createWithRelationships = _ref.createWithRelationships,
      relationship = _ref.relationship;

  var isArray = Array.isArray(relationship.data);
  if (isArray) {
    var relationshipItems = relationship.data;
    return relationshipItems.map(function (item) {
      return createWithRelationships(item).then(function (_ref2) {
        var id = _ref2.id,
            type = _ref2.type;

        return {
          id: id,
          type: type
        };
      });
    }).then(function (updatedRelationships) {
      return {
        data: updatedRelationships
      };
    });
  }
  return createWithRelationships(relationship.data).then(function (_ref3) {
    var id = _ref3.id,
        type = _ref3.type;

    return {
      data: {
        id: id,
        type: type
      }
    };
  });
};