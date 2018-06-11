'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolveItemRelationship = require('./resolveItemRelationship');

module.exports = function resolveItemRelationships(_ref) {
  var coreToNested = _ref.coreToNested,
      getItemByTypeId = _ref.getItemByTypeId,
      item = _ref.item,
      _ref$relationships = _ref.relationships,
      relationships = _ref$relationships === undefined ? {} : _ref$relationships,
      relationshipSpecification = _ref.relationshipSpecification;

  return _promise2.default.resolve().then(function () {
    return _promise2.default.all((0, _keys2.default)(relationshipSpecification).map(function (relationshipKey) {
      var _relationshipSpecific = relationshipSpecification[relationshipKey],
          path = _relationshipSpecific.path,
          type = _relationshipSpecific.targetResource;


      return _promise2.default.resolve(resolveItemRelationship({
        coreToNested: coreToNested,
        getItemByTypeId: getItemByTypeId,
        item: item,
        path: path,
        relationshipKey: relationshipKey,
        relationships: relationships,
        type: type
      }));
    })).then(function () {
      return item;
    });
  });
};