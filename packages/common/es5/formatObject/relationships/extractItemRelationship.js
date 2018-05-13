'use strict';

var objectPath = require('object-path');
var walk = require('../utilities/walkObject');
var createLid = require('../utilities/createLid');

module.exports = function extractItemRelationship(_ref) {
  var item = _ref.item,
      path = _ref.path,
      relationshipFormat = _ref.relationshipFormat,
      relationshipKey = _ref.relationshipKey,
      relationshipType = _ref.relationshipType,
      nestedToCore = _ref.nestedToCore;

  var relationshipObject = null;
  var relationshipArray = [];
  if (path) {
    var segments = path.split('.*.');

    walk({
      func: function func(pth) {
        var relationship = objectPath.get(item, pth);
        if (relationship.id === undefined) {
          relationship.lid = createLid();
        }

        var referense = relationship.id !== undefined ? {
          id: relationship.id
        } : {
          lid: relationship.lid
        };

        objectPath.set(item, pth, referense);

        var formattedRelationship = nestedToCore ? nestedToCore({
          item: relationship,
          normalize: true,
          type: relationshipType
        }) : relationship;

        if (relationshipFormat === 'object') {
          relationshipObject = formattedRelationship;
        } else {
          relationshipArray.push(formattedRelationship);
        }
      },
      obj: item,
      segments: segments
    });
  } else {
    if (relationshipFormat === 'object') {
      relationshipObject = item[relationshipKey] && item[relationshipKey].id ? { id: item[relationshipKey].id, type: relationshipType } : null;
    } else if (item[relationshipKey]) {
      relationshipArray = item[relationshipKey].map(function (arrayItem) {
        return arrayItem && arrayItem.id ? { id: arrayItem.id, type: relationshipType } : null;
      }).filter(function (arrayItem) {
        return !!arrayItem;
      });
    }
    delete item[relationshipKey];
  }

  if (relationshipArray && relationshipArray.length) {
    relationshipArray = relationshipArray.filter(function (relationship) {
      return !!relationship;
    });
  }

  if (relationshipFormat === 'object' && relationshipObject) {
    objectPath.set(item, 'relationships.' + relationshipKey + '.data', relationshipObject);
  }

  if (relationshipFormat === 'array' && relationshipArray && relationshipArray.length) {
    objectPath.set(item, 'relationships.' + relationshipKey + '.data', relationshipArray);
  }

  return item;
};