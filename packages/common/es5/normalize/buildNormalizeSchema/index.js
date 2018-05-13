'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('normalizr'),
    schema = _require.schema;

var getIdAttribute = require('./getIdAttribute');
var getTypeAndRef = require('./getTypeAndRef');
var processStrategy = require('./processStrategy');
var models = require('../../../dist/models.json');

var options = {
  idAttribute: getIdAttribute,
  processStrategy: processStrategy
};

module.exports = function buildNormalizeSchema(_ref) {
  var rootSchema = _ref.rootSchema,
      normalizedSchemaSpecification = _ref.normalizedSchemaSpecification;

  var schemas = {};
  var visited = {};

  var buildSchemas = function buildSchemas(modelName) {
    visited[modelName] = true;
    var model = models[modelName];
    if (!model) {
      throw new Error('Cant find model with name: ' + modelName);
    }
    var properties = model.properties;

    var relations = (0, _keys2.default)(properties).reduce(function (obj, key) {
      var property = properties[key];

      var _getTypeAndRef = getTypeAndRef(property),
          ref = _getTypeAndRef.ref,
          type = _getTypeAndRef.type;

      var _ref2 = normalizedSchemaSpecification[ref] || {},
          column = _ref2.column,
          normalize = _ref2.normalize;

      if (!column || normalize === false) {
        return obj;
      }

      if (!schemas[column] && !visited[ref]) {
        schemas[column] = buildSchemas(ref);
      }

      return (0, _extends4.default)({}, obj, (0, _defineProperty3.default)({}, key, type === 'object' ? schemas[column] : [schemas[column]]));
    }, {});

    var _ref3 = normalizedSchemaSpecification[modelName] || {},
        modelColumnName = _ref3.column;

    return new schema.Entity(modelColumnName || modelName, relations, options);
  };

  var _ref4 = normalizedSchemaSpecification[rootSchema] || {},
      rootColumnName = _ref4.column;

  schemas[rootColumnName] = buildSchemas(rootSchema);
  return schemas;
};