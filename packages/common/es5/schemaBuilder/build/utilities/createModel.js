'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var interpolate = require('../utilities/interpolate');
var normalizeModel = require('../utilities/normalizeModel');
var splitDescription = require('./splitDescription');

module.exports = function createModel(_ref) {
  var examples = _ref.examples,
      model = _ref.model,
      modelKey = _ref.modelKey,
      normalize = _ref.normalize,
      _ref$referencePath = _ref.referencePath,
      referencePath = _ref$referencePath === undefined ? '#/components/schemas/' : _ref$referencePath,
      _ref$removeRelationsh = _ref.removeRelationships,
      removeRelationships = _ref$removeRelationsh === undefined ? false : _ref$removeRelationsh;

  var normalizedModel = normalizeModel({ model: model, normalize: normalize });

  var cleanedModel = JSON.parse((0, _stringify2.default)(normalizedModel));

  if (removeRelationships && cleanedModel.properties && cleanedModel.properties.relationships) {
    delete cleanedModel.properties.relationships;
  }

  if (model.modelType) {
    cleanedModel['x-modelType'] = model.modelType;
    delete cleanedModel.modelType;
  }

  if (examples) {
    cleanedModel['x-examples'] = examples;

    if (examples.primary) {
      cleanedModel.example = examples.primary;
    }
  }

  (0, _keys2.default)(cleanedModel.properties).forEach(function (property) {
    var _splitDescription = splitDescription(cleanedModel.properties[property].description),
        summary = _splitDescription.summary,
        description = _splitDescription.description;

    cleanedModel.properties[property].description = description;
    cleanedModel.properties[property]['x-summary'] = summary;
  });

  var _splitDescription2 = splitDescription(cleanedModel.description),
      summary = _splitDescription2.summary,
      description = _splitDescription2.description;

  cleanedModel.description = description;
  cleanedModel['x-summary'] = summary;

  return interpolate((0, _extends3.default)({}, cleanedModel, {
    description: cleanedModel.description || '',
    id: modelKey
  }), '__ROOT__', referencePath);
};