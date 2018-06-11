'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolveItemRelationshipSync = require('./resolveItemRelationshipSync');

module.exports = function resolveItemRelationshipSyncs(_ref) {
  var coreToNestedSync = _ref.coreToNestedSync,
      getItemByTypeId = _ref.getItemByTypeId,
      item = _ref.item,
      _ref$relationships = _ref.relationships,
      relationships = _ref$relationships === undefined ? {} : _ref$relationships,
      relationshipSpecification = _ref.relationshipSpecification;

  (0, _keys2.default)(relationshipSpecification).forEach(function (relationshipKey) {
    var _relationshipSpecific = relationshipSpecification[relationshipKey],
        path = _relationshipSpecific.path,
        type = _relationshipSpecific.targetResource;

    item = resolveItemRelationshipSync({
      coreToNestedSync: coreToNestedSync,
      getItemByTypeId: getItemByTypeId,
      item: item,
      path: path,
      relationshipKey: relationshipKey,
      relationships: relationships,
      type: type
    });
  });

  return item;
};