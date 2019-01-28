'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nestedToCoreSync = require('./nestedToCoreSync');

module.exports = function nestedToCore(_ref) {
  var _ref$extractRelations = _ref.extractRelationships,
      extractRelationships = _ref$extractRelations === undefined ? true : _ref$extractRelations,
      _ref$formatRelationsh = _ref.formatRelationships,
      formatRelationships = _ref$formatRelationsh === undefined ? true : _ref$formatRelationsh,
      rawItem = _ref.item,
      _ref$normalize = _ref.normalize,
      normalize = _ref$normalize === undefined ? true : _ref$normalize,
      stripRelationships = _ref.stripRelationships,
      resourceType = _ref.type;

  return _promise2.default.resolve().then(function () {
    return nestedToCoreSync({
      extractRelationships: extractRelationships,
      formatRelationships: formatRelationships,
      item: rawItem,
      normalize: normalize,
      stripRelationships: stripRelationships,
      type: resourceType
    });
  });
};