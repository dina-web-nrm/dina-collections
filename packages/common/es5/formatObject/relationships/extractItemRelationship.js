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

  var segments = path.split('.*.');
  var relationships = [];
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