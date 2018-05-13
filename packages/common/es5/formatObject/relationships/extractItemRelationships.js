'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractItemRelationship = require('./extractItemRelationship');

module.exports = function extractItemRelationships(_ref) {
  var item = _ref.item,
      nestedToCore = _ref.nestedToCore,
      relationshipSpecification = _ref.relationshipSpecification;

  var updatedItem = item;
  (0, _keys2.default)(relationshipSpecification).forEach(function (relationshipKey) {
    var _relationshipSpecific = relationshipSpecification[relationshipKey],
        relationshipFormat = _relationshipSpecific.format,
        path = _relationshipSpecific.path,
        relationshipType = _relationshipSpecific.type;


    updatedItem = extractItemRelationship({
      item: item,
      nestedToCore: nestedToCore,
      path: path,
      relationshipFormat: relationshipFormat,
      relationshipKey: relationshipKey,
      relationshipType: relationshipType
    });
  });

  return updatedItem;
};