'use strict';

var objectPath = require('object-path');
var walk = require('../utilities/walkObject');

module.exports = function extractItemRelationship(_ref) {
  var item = _ref.item,
      path = _ref.path,
      relationshipFormat = _ref.relationshipFormat,
      relationshipKey = _ref.relationshipKey,
      relationshipType = _ref.relationshipType,
      nestedToCore = _ref.nestedToCore;

  var segments = path.split('.*.');
  var relationships = [];
  walk({
    func: function func(pth) {
      var relationship = objectPath.get(item, pth);
      objectPath.set(item, pth, {
        id: relationship.id
      });

      var formattedRelationship = nestedToCore ? nestedToCore({
        item: relationship,
        normalize: true,
        type: relationshipType
      }) : relationship;

      relationships.push(formattedRelationship);
    },
    obj: item,
    segments: segments
  });

  relationships.filter(function (relationship) {
    return !!relationship;
  });

  if (relationships.length) {
    objectPath.set(item, 'relationships.' + relationshipKey + '.data', relationshipFormat === 'object' ? relationships[0] : relationships);
  }

  return item;
};