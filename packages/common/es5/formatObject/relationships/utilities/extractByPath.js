'use strict';

var objectPath = require('object-path');
var createLid = require('../../../createLid');
var walkObject = require('../../utilities/walkObject');

var _require = require('./updatePathRelationshipData'),
    updatePathRelationshipData = _require.updatePathRelationshipData;

var extractByPath = function extractByPath(_ref) {
  var item = _ref.item,
      nestedToCoreSync = _ref.nestedToCoreSync,
      path = _ref.path,
      relationshipFormat = _ref.relationshipFormat,
      relationshipType = _ref.relationshipType;

  var relationshipObject = void 0;
  var relationshipArray = void 0;

  var arrayPath = path;
  if (!Array.isArray(path)) {
    arrayPath = [path];
  }

  arrayPath.forEach(function (pathItem) {
    var segments = pathItem.split('.*.');

    walkObject({
      func: function func(pth) {
        var relationship = objectPath.get(item, pth);
        if (relationship.id === undefined) {
          relationship.lid = createLid();
        }

        var reference = relationship.id !== undefined ? {
          id: relationship.id
        } : {
          lid: relationship.lid
        };

        objectPath.set(item, pth, reference);

        var formattedRelationship = nestedToCoreSync ? nestedToCoreSync({
          item: relationship,
          normalize: true,
          type: relationshipType
        }) : relationship;

        var updatedRelationships = updatePathRelationshipData({
          formattedRelationship: formattedRelationship,
          relationshipArray: relationshipArray,
          relationshipFormat: relationshipFormat,
          relationshipObject: relationshipObject
        });

        relationshipArray = updatedRelationships.relationshipArray;
        relationshipObject = updatedRelationships.relationshipObject;
      },
      obj: item,
      segments: segments
    });
  });

  if (relationshipArray && relationshipArray.length) {
    relationshipArray = relationshipArray.filter(function (relationship) {
      return !!relationship;
    });
  }

  return {
    relationshipArray: relationshipArray,
    relationshipObject: relationshipObject
  };
};
module.exports = { extractByPath: extractByPath };