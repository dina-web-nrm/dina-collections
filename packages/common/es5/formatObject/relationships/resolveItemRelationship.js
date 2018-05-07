'use strict';

var objectPath = require('object-path');
var walk = require('../utilities/walkObject');
var createRelationshipIdMap = require('../utilities/createRelationshipIdMap');

module.exports = function resolveItemRelationship(_ref) {
  var getItemByTypeId = _ref.getItemByTypeId,
      item = _ref.item,
      relationships = _ref.relationships,
      path = _ref.path,
      relationshipKey = _ref.relationshipKey,
      type = _ref.type;

  var segments = path.split('.*.');
  var relationship = relationships[relationshipKey];
  if (!relationship) {
    return item;
  }

  var relationshipIdMap = createRelationshipIdMap({
    relationship: relationship,
    type: type
  });

  walk({
    func: function func(pth) {
      var relationshipIdInObject = objectPath.get(item, pth).id;
      var relationshipIdInObjectExistInRelationships = relationshipIdInObject && relationshipIdMap[relationshipIdInObject];

      var resolvedRelationshipItem = relationshipIdInObjectExistInRelationships && getItemByTypeId && getItemByTypeId(type, relationshipIdInObject);
      if (resolvedRelationshipItem) {
        objectPath.set(item, pth, resolvedRelationshipItem);
      }
    },
    obj: item,
    segments: segments
  });

  return item;
};