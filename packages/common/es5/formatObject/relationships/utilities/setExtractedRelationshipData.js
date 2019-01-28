'use strict';

var objectPath = require('object-path');

var setExtractedRelationshipData = function setExtractedRelationshipData(_ref) {
  var item = _ref.item,
      _ref$relationshipArra = _ref.relationshipArray,
      relationshipArray = _ref$relationshipArra === undefined ? [] : _ref$relationshipArra,
      relationshipFormat = _ref.relationshipFormat,
      relationshipKey = _ref.relationshipKey,
      relationshipObject = _ref.relationshipObject,
      stripRelationships = _ref.stripRelationships;

  if (relationshipFormat === 'object' && relationshipObject !== undefined) {
    objectPath.set(item, 'relationships.' + relationshipKey + '.data', stripRelationships ? { id: relationshipObject.id, type: relationshipObject.type } : relationshipObject);
  }

  if (relationshipFormat === 'array') {
    objectPath.set(item, 'relationships.' + relationshipKey + '.data', stripRelationships ? relationshipArray.map(function (_ref2) {
      var id = _ref2.id,
          type = _ref2.type;

      return {
        id: id,
        type: type
      };
    }) : relationshipArray);
  }

  return item;
};

module.exports = { setExtractedRelationshipData: setExtractedRelationshipData };