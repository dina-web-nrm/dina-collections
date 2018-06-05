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

  if (path) {
    var arrayPath = path;
    if (!Array.isArray(path)) {
      arrayPath = [path];
    }

    arrayPath.forEach(function (pathItem) {
      var segments = pathItem.split('.*.');

      walk({
        func: function func(pth) {
          var relationshipObject = objectPath.get(item, pth);

          var id = relationshipObject && relationshipObject.id;
          var lid = relationshipObject && relationshipObject.lid;

          var resolvedRelationshipItem = void 0;
          if (getItemByTypeId) {
            if (id === undefined && lid !== undefined) {
              var relationshipData = relationships[relationshipKey] && relationships[relationshipKey].data;
              var relationshipArray = Array.isArray(relationshipData) ? relationshipData : [relationshipData];

              resolvedRelationshipItem = relationshipArray.filter(function (relationshipDataItem) {
                return !!relationshipDataItem;
              }).reduce(function (matching, _ref2) {
                var relationshipId = _ref2.id;

                if (matching) {
                  return matching;
                }
                var tmp = getItemByTypeId(type, relationshipId);
                if (tmp && tmp.attributes && tmp.attributes.lid === lid) {
                  return tmp;
                }

                return undefined;
              }, undefined);
            } else {
              resolvedRelationshipItem = id && getItemByTypeId && getItemByTypeId(type, id);
            }
          }

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
    });

    return item;
  }

  var relationship = relationships[relationshipKey];
  if (!(relationship && relationship.data)) {
    return item;
  }

  if (Array.isArray(relationship.data)) {
    return (0, _extends5.default)({}, item, (0, _defineProperty3.default)({}, relationshipKey, relationship.data.map(function (_ref3) {
      var id = _ref3.id;

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