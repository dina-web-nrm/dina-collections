'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cloneObject = require('./utilities/cloneObject');

var _require = require('./specifications'),
    getNormalizeSpecification = _require.getNormalizeSpecification,
    getRelationshipSpecification = _require.getRelationshipSpecification;

var normalizeItem = require('./normalize/normalizeItem');
var extractItemRelationships = require('./relationships/extractItemRelationships');

module.exports = function nestedToCoreSync(_ref) {
  var _ref$extractRelations = _ref.extractRelationships,
      extractRelationships = _ref$extractRelations === undefined ? true : _ref$extractRelations,
      _ref$formatRelationsh = _ref.formatRelationships,
      formatRelationships = _ref$formatRelationsh === undefined ? true : _ref$formatRelationsh,
      rawItem = _ref.item,
      _ref$normalize = _ref.normalize,
      normalize = _ref$normalize === undefined ? true : _ref$normalize,
      resourceType = _ref.type;

  if (typeof rawItem === 'string') {
    throw new Error('item must not be a string');
  }

  if (!rawItem) {
    return rawItem;
  }

  var item = cloneObject(rawItem);
  var normalizeSpecification = getNormalizeSpecification(resourceType);
  var relationshipSpecification = getRelationshipSpecification(resourceType);

  if (extractRelationships && relationshipSpecification) {
    item = extractItemRelationships({
      item: item,
      nestedToCoreSync: formatRelationships ? nestedToCoreSync : null,
      relationshipSpecification: relationshipSpecification
    });
  }

  if (normalize && normalizeSpecification) {
    item = normalizeItem({ item: item, normalizeSpecification: normalizeSpecification, resourceType: resourceType });
  }

  var _item = item,
      id = _item.id,
      relationships = _item.relationships,
      attributes = (0, _objectWithoutProperties3.default)(_item, ['id', 'relationships']);


  var coreItem = {
    type: resourceType
  };

  if (id !== undefined) {
    coreItem = (0, _extends3.default)({}, coreItem, {
      id: id
    });
  }

  if (relationships && (0, _keys2.default)(relationships).length) {
    coreItem = (0, _extends3.default)({}, coreItem, {
      relationships: relationships
    });
  }

  if (attributes && (0, _keys2.default)(attributes).length) {
    coreItem = (0, _extends3.default)({}, coreItem, {
      attributes: attributes
    });
  }

  return coreItem;
};