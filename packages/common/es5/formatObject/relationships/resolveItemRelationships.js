'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolveItemRelationship = require('./resolveItemRelationship');

module.exports = function resolveItemRelationships(_ref) {
  var coreToNested = _ref.coreToNested,
      getItemByTypeId = _ref.getItemByTypeId,
      item = _ref.item,
      _ref$relationships = _ref.relationships,
      relationships = _ref$relationships === undefined ? {} : _ref$relationships,
      relationshipSpecification = _ref.relationshipSpecification;

  var updatedItem = item;
  (0, _keys2.default)(relationshipSpecification).forEach(function (relationshipKey) {
    var _relationshipSpecific = relationshipSpecification[relationshipKey],
        path = _relationshipSpecific.path,
        type = _relationshipSpecific.type;


    updatedItem = resolveItemRelationship({
      coreToNested: coreToNested,
      getItemByTypeId: getItemByTypeId,
      item: updatedItem,
      path: path,
      relationshipKey: relationshipKey,
      relationships: relationships,
      type: type
    });
  });
  return updatedItem;
};