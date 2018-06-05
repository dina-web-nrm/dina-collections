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

  var relationshipObject = void 0;
  var relationshipArray = void 0;
  if (path) {
    var arrayPath = path;
    if (!Array.isArray(path)) {
      arrayPath = [path];
    }

    arrayPath.forEach(function (pathItem) {
      var segments = pathItem.split('.*.');

      walk({
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

          var formattedRelationship = nestedToCore ? nestedToCore({
            item: relationship,
            normalize: true,
            type: relationshipType
          }) : relationship;

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
        },
        obj: item,
        segments: segments
      });
    });
  } else {
    if (relationshipFormat === 'object') {
      if (item[relationshipKey] === null) {
        relationshipObject = null;
      } else {
        relationshipObject = item[relationshipKey] && item[relationshipKey].id ? { id: item[relationshipKey].id, type: relationshipType } : undefined;
      }
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

  if (relationshipFormat === 'object' && relationshipObject !== undefined) {
    objectPath.set(item, 'relationships.' + relationshipKey + '.data', relationshipObject);
  }

  if (relationshipFormat === 'array' && relationshipArray !== undefined) {
    objectPath.set(item, 'relationships.' + relationshipKey + '.data', relationshipArray);
  }

  return item;
};