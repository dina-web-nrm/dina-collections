'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('reselect'),
    createSelector = _require.createSelector;

var createNormalizeSpecification = require('./createNormalizeSpecification');

module.exports = createSelector(function (_ref) {
  var models = _ref.models;
  return models;
}, function (models) {
  return (0, _keys2.default)(models).reduce(function (schemas, modelKey) {
    if (models[modelKey]['x-normalize']) {
      return (0, _extends4.default)({}, schemas, (0, _defineProperty3.default)({}, modelKey, createNormalizeSpecification({
        modelKey: modelKey,
        models: models
      })));
    }
    return schemas;
  }, {});
});