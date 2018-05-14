'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  var relationship = relationships[relationshipKey];
  if (!(relationship && relationship.data)) {
    return item;
  }

  if (path) {
    var segments = path.split('.*.');

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
  }

  if (Array.isArray(relationship.data)) {
    return (0, _extends5.default)({}, item, (0, _defineProperty3.default)({}, relationshipKey, relationship.data.map(function (_ref2) {
      var id = _ref2.id;

      var resolvedRelationshipItem = id && getItemByTypeId && getItemByTypeId(type, id);
      if (resolvedRelationshipItem) {
        return coreToNested({
          getItemByTypeId: getItemByTypeId,
          item: resolvedRelationshipItem,
          type: type
        });
      }
      return {
        id: id
      };
    })));
  }

  var relationshipItem = void 0;

  var resolvedRelationshipItem = relationship.data.id && getItemByTypeId && getItemByTypeId(type, relationship.data.id);

  if (resolvedRelationshipItem) {
    relationshipItem = coreToNested({
      getItemByTypeId: getItemByTypeId,
      item: resolvedRelationshipItem,
      type: type
    });
  } else {
    relationshipItem = {
      id: relationship.data.id
    };
  }

  return (0, _extends5.default)({}, item, (0, _defineProperty3.default)({}, relationshipKey, relationshipItem));
};