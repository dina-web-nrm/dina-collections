'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectPath = require('object-path');
var Ajv = require('ajv');
var ajvKeywords = require('ajv-keywords');

var defaultValidatorKeywords = require('./defaultValidatorKeywords');

var defaultOptions = {
  allErrors: true,
  format: 'full',
  jsonPointers: true,
  logger: false,
  useDefaults: true,
  verbose: false };

var createValidatorFactory = function createValidatorFactory() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$keywords = _ref.keywords,
      keywordsInput = _ref$keywords === undefined ? {} : _ref$keywords,
      models = _ref.models;

  var rawModels = JSON.parse((0, _stringify2.default)(models));

  var createAjv = function createAjv(options) {
    var ajv = new Ajv((0, _extends3.default)({}, options, { format: 'full' }));

    ajvKeywords(ajv, 'deepRequired');

    (0, _keys2.default)(models).forEach(function (key) {
      ajv.addSchema(models[key], key);
    });

    var keywords = (0, _extends3.default)({}, defaultValidatorKeywords, keywordsInput);

    (0, _keys2.default)(keywords).forEach(function (keyword) {
      ajv.addKeyword(keyword, keywords[keyword]);
    });

    return ajv;
  };

  var defaultAjv = createAjv(defaultOptions);

  return function createModelSchemaValidator(_ref2) {
    var dataPath = _ref2.dataPath,
        customSchema = _ref2.schema,
        model = _ref2.model,
        errorHandler = _ref2.errorHandler,
        throwError = _ref2.throwError,
        options = _ref2.options;

    var ajv = options ? createAjv(options) : defaultAjv;
    if (model && !models[model]) {
      throw new Error('Unknown model: ' + model);
    }

    if (!models[model] && !customSchema) {
      throw new Error('If model not provided have to provide customSchema (key schema)');
    }

    var schema = rawModels[model] || customSchema;
    return function (obj) {
      var objToTest = dataPath && obj ? objectPath.get(obj, dataPath) : obj;
      var validate = ajv.compile(schema);
      var valid = validate(objToTest);
      if (valid) {
        return null;
      }

      var error = errorHandler ? errorHandler(validate.errors) : validate.errors;

      if (throwError) {
        throw error;
      }

      return error;
    };
  };
};

module.exports = createValidatorFactory;