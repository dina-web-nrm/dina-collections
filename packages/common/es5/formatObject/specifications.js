'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var models = require('../../dist/models.json');
var createNormalizeSpecifications = require('./normalize/createNormalizeSpecifications');
var createRelationshipSpecifications = require('./relationships/createRelationshipSpecifications');
var createDbSpecifications = require('./db/createDbSpecifications');

var relationshipSpecifications = createRelationshipSpecifications({ models: models });
var normalizeSpecifications = createNormalizeSpecifications({ models: models });
var dbSpecifications = createDbSpecifications({ models: models });

exports.getNormalizeSpecification = function getNormalizeSpecification(type) {
  return normalizeSpecifications[type];
};

exports.getRelationshipSpecification = function getRelationshipSpecification(type) {
  return relationshipSpecifications[type];
};

exports.getDbSpecification = function getDbSpecification(type) {
  return dbSpecifications[type];
};

exports.getNormalizedColumnNames = function getNormalizedColumnNames(type) {
  var dbSpecification = exports.getDbSpecification(type);
  if (!dbSpecification) {
    return ['relationships'];
  }

  return (0, _keys2.default)(dbSpecification).reduce(function (arr, key) {
    return [].concat((0, _toConsumableArray3.default)(arr), [dbSpecification[key]]);
  }, ['relationships']);
};