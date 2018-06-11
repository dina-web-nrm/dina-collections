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

var createKeyColumnMap = require('./createKeyColumnMap');
var normalizrGetIdAttribute = require('./utilities/normalizrGetIdAttribute');
var normalizrProcessStrategy = require('./utilities/normalizrProcessStrategy');
var getModelIsColumn = require('./utilities/getModelIsColumn');
var getModelFormat = require('./utilities/getModelFormat');
var getModelType = require('./utilities/getModelType');

var options = {
  idAttribute: normalizrGetIdAttribute,
  processStrategy: normalizrProcessStrategy
};

module.exports = function createNormalizeSpecification(_ref) {
  var modelKey = _ref.modelKey,
      models = _ref.models;

  var baseModel = models[modelKey];

  var keyColumnMap = createKeyColumnMap(baseModel);

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
      var type = getModelType(property);
      var format = getModelFormat(property);
      var isColumn = getModelIsColumn(property);

      var column = keyColumnMap[type];
      if (!column) {
        return obj;
      }

      if (!schemas[column] && !visited[type] && !isColumn) {
        schemas[column] = buildSchemas(type);
      }

      return (0, _extends4.default)({}, obj, (0, _defineProperty3.default)({}, key, format === 'object' ? schemas[column] : [schemas[column]]));
    }, {});

    var modelColumnName = keyColumnMap[modelName];
    return new schema.Entity(modelColumnName || modelName, relations, options);
  };

  schemas[modelKey] = buildSchemas(modelKey);
  return schemas;
};