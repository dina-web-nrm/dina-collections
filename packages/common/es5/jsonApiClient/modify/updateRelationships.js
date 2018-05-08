'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var dep = new Dependor({});

function updateRelationships(_ref) {
  var relationships = _ref.relationships,
      resource = _ref.resource;

  return _promise2.default.resolve(true);
}

module.exports = {
  dep: dep,
  updateRelationships: updateRelationships
};