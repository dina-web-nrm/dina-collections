'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');

var readJsonFromDirectory = require('./utilities/readJsonFromDirectory');

module.exports = function readModels(modelsBasePath) {
  return fs.readdirSync(modelsBasePath).filter(function (category) {
    return category[0] !== '.';
  }).reduce(function (obj, category) {
    var categoryBasePath = path.join(modelsBasePath, category);
    var categoryModels = readJsonFromDirectory({
      directory: categoryBasePath,
      includeProperties: true,
      modelType: 'model'
    });

    var patchedModels = (0, _keys2.default)(categoryModels).reduce(function (models, key) {
      var model = categoryModels[key];

      return (0, _extends4.default)({}, models, (0, _defineProperty3.default)({}, key, (0, _extends4.default)({}, model, {
        'x-category': category
      })));
    }, {});

    return (0, _extends4.default)({}, obj, patchedModels);
  }, {});
};