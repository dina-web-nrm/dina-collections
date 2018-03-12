'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildRelationship = require('./buildRelationship');
var buildVersionRelationships = require('./buildVersionRelationships');

var buildRelationshipsArray = function buildRelationshipsArray(_ref) {
  var relations = _ref.relations;

  if (!relations || !(0, _keys2.default)(relations).length) {
    return [];
  }

  return (0, _keys2.default)(relations).map(function (relationKey) {
    var relation = relations[relationKey];
    return (0, _extends4.default)({}, relation, {
      key: relationKey
    });
  });
};

module.exports = function buildRelationships() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      relationsObject = _ref2.relations,
      versionsLink = _ref2.versionsLink;

  var relations = buildRelationshipsArray({
    relations: relationsObject
  });
  var versionRelationship = buildVersionRelationships({ versionsLink: versionsLink });

  var resourceRelationships = relations.reduce(function (obj, relation) {
    return (0, _extends4.default)({}, obj, (0, _defineProperty3.default)({}, relation.key, buildRelationship(relation)));
  }, {});

  if (!(versionRelationship || resourceRelationships && (0, _keys2.default)(resourceRelationships).length)) {
    return undefined;
  }

  var relationships = {
    properties: {},
    type: 'object'
  };

  if (versionRelationship) {
    relationships.properties.versions = versionRelationship;
  }

  if (resourceRelationships) {
    relationships.properties = (0, _extends4.default)({}, relationships.properties, resourceRelationships);
  }

  return relationships;
};