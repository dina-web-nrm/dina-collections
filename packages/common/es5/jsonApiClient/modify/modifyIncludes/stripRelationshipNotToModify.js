"use strict";

function stripRelationshipNotToModify() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$relationship = _ref.relationship,
      relationship = _ref$relationship === undefined ? {} : _ref$relationship;

  var isArray = Array.isArray(relationship.data);
  if (isArray) {
    return {
      data: relationship.data.map(function (item) {
        return {
          id: item.id,
          type: item.type
        };
      })
    };
  }

  if (!relationship.data) {
    return null;
  }

  return {
    data: {
      id: relationship.data.id,
      type: relationship.data.type
    }
  };
}

module.exports = {
  stripRelationshipNotToModify: stripRelationshipNotToModify
};