'use strict';

var updatePathRelationshipData = function updatePathRelationshipData(_ref) {
  var formattedRelationship = _ref.formattedRelationship,
      relationshipArray = _ref.relationshipArray,
      relationshipFormat = _ref.relationshipFormat,
      relationshipObject = _ref.relationshipObject;

  if (relationshipFormat === 'object') {
    relationshipObject = formattedRelationship;
  } else {
    var exists = (relationshipArray || []).find(function (_ref2) {
      var id = _ref2.id;

      return id !== undefined && id === formattedRelationship.id;
    });
    if (!exists) {
      if (!relationshipArray) {
        relationshipArray = [formattedRelationship];
      } else {
        relationshipArray.push(formattedRelationship);
      }
    }
  }

  return {
    relationshipArray: relationshipArray,
    relationshipObject: relationshipObject
  };
};

module.exports = { updatePathRelationshipData: updatePathRelationshipData };