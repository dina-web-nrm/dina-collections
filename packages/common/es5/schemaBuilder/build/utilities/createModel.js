'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var interpolate = require('../utilities/interpolate');
var normalizeModel = require('../utilities/normalizeModel');

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

  var cleanedModel = normalizedModel;

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

  return interpolate((0, _extends3.default)({}, cleanedModel, {
    description: cleanedModel.description || '',
    id: modelKey
  }), '__ROOT__', referencePath);
};