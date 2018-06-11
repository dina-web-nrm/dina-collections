'use strict';

var objectPath = require('object-path');

var setExtractedRelationshipData = function setExtractedRelationshipData(_ref) {
  var item = _ref.item,
      relationshipArray = _ref.relationshipArray,
      relationshipFormat = _ref.relationshipFormat,
      relationshipKey = _ref.relationshipKey,
      relationshipObject = _ref.relationshipObject;

  if (relationshipFormat === 'object' && relationshipObject !== undefined) {
    objectPath.set(item, 'relationships.' + relationshipKey + '.data', relationshipObject);
  }

  if (relationshipFormat === 'array' && relationshipArray !== undefined) {
    objectPath.set(item, 'relationships.' + relationshipKey + '.data', relationshipArray);
  }

  return item;
};

module.exports = { setExtractedRelationshipData: setExtractedRelationshipData };