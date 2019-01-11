'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('../../schemaInterface'),
    getResourceRelationshipKeysToIncludeInBodyMap = _require2.getResourceRelationshipKeysToIncludeInBodyMap;

var shouldModifyRelationship = require('./shouldModifyRelationship');

var resourceRelationshipKeysToIncludeInBodyMap = getResourceRelationshipKeysToIncludeInBodyMap();

var dep = new Dependor({
  resourceRelationshipKeysToIncludeInBodyMap: resourceRelationshipKeysToIncludeInBodyMap,
  shouldModifyRelationship: shouldModifyRelationship
});

function splitRelationships() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      itemResourceType = _ref.itemResourceType,
      relationships = _ref.relationships,
      relationshipsToModify = _ref.relationshipsToModify,
      resourcePath = _ref.resourcePath;

  var res = {
    relationshipsToAssociateSeparately: {},
    relationshipsToIncludeInRequest: {},
    relationshipsToNotModify: []
  };

  var relationshipKeysToIncludeInBody = dep.resourceRelationshipKeysToIncludeInBodyMap[itemResourceType] || [];

  (0, _keys2.default)(relationships).forEach(function (relationKey) {
    if (!shouldModifyRelationship({
      relationKey: relationKey,
      relationshipsToModify: relationshipsToModify,
      resourcePath: resourcePath
    })) {
      res.relationshipsToNotModify.push(relationKey);
    } else if (relationshipKeysToIncludeInBody.includes(relationKey)) {
      res.relationshipsToIncludeInRequest[relationKey] = relationships[relationKey];
    } else {
      res.relationshipsToAssociateSeparately[relationKey] = relationships[relationKey];
    }
  });
  return res;
}

module.exports = {
  dep: dep,
  splitRelationships: splitRelationships
};