'use strict';

var objectPath = require('object-path');
var walk = require('../utilities/walkObject');

module.exports = function resolveItemRelationship(_ref) {
  var coreToNested = _ref.coreToNested,
      getItemByTypeId = _ref.getItemByTypeId,
      item = _ref.item,
      path = _ref.path,
      relationshipKey = _ref.relationshipKey,
      relationships = _ref.relationships,
      type = _ref.type;

  var segments = path.split('.*.');
  var relationship = relationships[relationshipKey];
  if (!relationship) {
    return item;
  }

  walk({
    func: function func(pth) {
      var relationshipObject = objectPath.get(item, pth);
      var id = relationshipObject && (relationshipObject.id || relationshipObject.lid);

      var resolvedRelationshipItem = id && getItemByTypeId && getItemByTypeId(type, id);

      if (resolvedRelationshipItem) {
        objectPath.set(item, pth, coreToNested({
          getItemByTypeId: getItemByTypeId,
          item: resolvedRelationshipItem,
          type: resolvedRelationshipItem.type
        }));
      }
    },
    obj: item,
    segments: segments
  });

  return item;
};