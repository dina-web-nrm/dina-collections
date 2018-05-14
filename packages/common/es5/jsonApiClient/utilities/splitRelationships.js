"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function splitRelationships() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$relationshipKeys = _ref.relationshipKeysToIncludeInBody,
      relationshipKeysToIncludeInBody = _ref$relationshipKeys === undefined ? [] : _ref$relationshipKeys,
      relationships = _ref.relationships;

  var res = {
    relationshipsToAssociateSeparatly: {},
    relationshipsToIncludeInRequest: {}
  };

  (0, _keys2.default)(relationships).forEach(function (key) {
    if (relationshipKeysToIncludeInBody.includes(key)) {
      res.relationshipsToIncludeInRequest[key] = relationships[key];
    } else {
      res.relationshipsToAssociateSeparatly[key] = relationships[key];
    }
  });
  return res;
}

module.exports = {
  splitRelationships: splitRelationships
};