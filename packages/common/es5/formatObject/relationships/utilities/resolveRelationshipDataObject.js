'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./resolveById'),
    resolveById = _require.resolveById;

var resolveRelationshipDataObject = function resolveRelationshipDataObject(_ref) {
  var formattedRelationshipItems = _ref.formattedRelationshipItems,
      item = _ref.item,
      relationship = _ref.relationship,
      relationshipKey = _ref.relationshipKey;

  return (0, _extends4.default)({}, item, (0, _defineProperty3.default)({}, relationshipKey, resolveById({
    formattedRelationshipItems: formattedRelationshipItems,
    id: relationship.data.id
  })));
};

module.exports = { resolveRelationshipDataObject: resolveRelationshipDataObject };