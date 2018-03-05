'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectPath = require('object-path');
var Ajv = require('ajv');
var models = require('../../dist/models.json');

var defaultOptions = {
  allErrors: true,

  jsonPointers: true,
  useDefaults: true,
  verbose: false };

var createAjv = function createAjv(options) {
  var ajv = new Ajv(options);

  (0, _keys2.default)(models).forEach(function (key) {
    ajv.addSchema(models[key], key);
  });

  return ajv;
};

var defaultAjv = createAjv(defaultOptions);

module.exports = function createModelSchemaValidator(_ref) {
  var dataPath = _ref.dataPath,
      customSchema = _ref.schema,
      model = _ref.model,
      errorHandler = _ref.errorHandler,
      throwOnError = _ref.throwOnError,
      options = _ref.options;

  var ajv = options ? createAjv(options) : defaultAjv;

  if (model && !models[model]) {
    throw new Error('Unknown model: ' + model);
  }

  if (!models[model] && !customSchema) {
    throw new Error('If model not provided have to provide customSchema (key schema)');
  }

  var schema = models[model] || customSchema;
  return function (obj) {
    var objToTest = dataPath && obj ? objectPath.get(obj, dataPath) : obj;
    var validate = ajv.compile(schema);
    var valid = validate(objToTest);
    if (valid) {
      return null;
    }

    var error = errorHandler ? errorHandler(validate.errors) : validate.errors;
    if (throwOnError) {
      throw error;
    }

    return error;
  };
};