'use strict';

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function createRelationshipIdMap(_ref) {
  var relationship = _ref.relationship,
      type = _ref.type;

  if (type === 'object') {
    var id = relationship && relationship.data && relationship.data.id;
    return (0, _defineProperty3.default)({}, id, true);
  }
  return (relationship && relationship.data || []).reduce(function (map, item) {
    return (0, _extends4.default)({}, map, (0, _defineProperty3.default)({}, item.id, true));
  }, {});
};