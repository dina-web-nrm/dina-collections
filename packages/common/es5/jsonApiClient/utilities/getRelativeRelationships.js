'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectPath = require('object-path');

module.exports = function getRelativeRelationSpecification(_ref) {
  var relationSpecification = _ref.relationSpecification,
      path = _ref.path;

  var relativeRelationSpecification = objectPath.get(relationSpecification, path);
  if (!relativeRelationSpecification) {
    return undefined;
  }

  return (0, _keys2.default)(relativeRelationSpecification).reduce(function (relationships, key) {
    if (relativeRelationSpecification[key] !== undefined) {
      return [].concat((0, _toConsumableArray3.default)(relationships), [key]);
    }
    return relationships;
  }, []);
};