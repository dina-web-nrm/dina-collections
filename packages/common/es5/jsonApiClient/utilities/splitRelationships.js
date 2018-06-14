'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('../../schemaInterface'),
    getResourceRelationshipKeysToIncludeInBodyMap = _require2.getResourceRelationshipKeysToIncludeInBodyMap;

var resourceRelationshipKeysToIncludeInBodyMap = getResourceRelationshipKeysToIncludeInBodyMap();

var dep = new Dependor({
  resourceRelationshipKeysToIncludeInBodyMap: resourceRelationshipKeysToIncludeInBodyMap
});

function splitRelationships() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      itemResourceType = _ref.itemResourceType,
      relationships = _ref.relationships;

  var res = {
    relationshipsToAssociateSeparately: {},
    relationshipsToIncludeInRequest: {}
  };

  var relationshipKeysToIncludeInBody = dep.resourceRelationshipKeysToIncludeInBodyMap[itemResourceType] || [];

  (0, _keys2.default)(relationships).forEach(function (key) {
    if (relationshipKeysToIncludeInBody.includes(key)) {
      res.relationshipsToIncludeInRequest[key] = relationships[key];
    } else {
      res.relationshipsToAssociateSeparately[key] = relationships[key];
    }
  });
  return res;
}

module.exports = {
  dep: dep,
  splitRelationships: splitRelationships
};