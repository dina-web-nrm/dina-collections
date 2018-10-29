'use strict';

var _require = require('./utilities/extractByPath'),
    extractByPath = _require.extractByPath;

var _require2 = require('./utilities/extractArrayRelationship'),
    extractArrayRelationship = _require2.extractArrayRelationship;

var _require3 = require('./utilities/extractObjectRelationship'),
    extractObjectRelationship = _require3.extractObjectRelationship;

var _require4 = require('./utilities/setExtractedRelationshipData'),
    setExtractedRelationshipData = _require4.setExtractedRelationshipData;

module.exports = function extractItemRelationship(_ref) {
  var item = _ref.item,
      path = _ref.path,
      relationshipFormat = _ref.relationshipFormat,
      relationshipKey = _ref.relationshipKey,
      relationshipType = _ref.relationshipType,
      nestedToCoreSync = _ref.nestedToCoreSync;

  var relationshipObject = void 0;
  var relationshipArray = void 0;

  if (path) {
    var extractedRelationships = extractByPath({
      item: item,
      nestedToCoreSync: nestedToCoreSync,
      path: path,
      relationshipFormat: relationshipFormat,
      relationshipType: relationshipType
    });

    relationshipObject = extractedRelationships.relationshipObject;
    relationshipArray = extractedRelationships.relationshipArray;
  } else {
    if (relationshipFormat === 'object') {
      relationshipObject = extractObjectRelationship({
        item: item,
        nestedToCoreSync: nestedToCoreSync,
        relationshipKey: relationshipKey,
        relationshipType: relationshipType
      });
    } else {
      relationshipArray = extractArrayRelationship({
        item: item,
        nestedToCoreSync: nestedToCoreSync,
        relationshipKey: relationshipKey,
        relationshipType: relationshipType
      });
    }

    delete item[relationshipKey];
  }

  return setExtractedRelationshipData({
    item: item,
    relationshipArray: relationshipArray,
    relationshipFormat: relationshipFormat,
    relationshipKey: relationshipKey,
    relationshipObject: relationshipObject
  });
};