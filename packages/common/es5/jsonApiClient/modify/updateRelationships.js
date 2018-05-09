'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./updateRelationship'),
    updateRelationship = _require2.updateRelationship;

var dep = new Dependor({
  updateRelationship: updateRelationship
});

function updateRelationships(_ref) {
  var openApiClient = _ref.openApiClient,
      relationships = _ref.relationships,
      item = _ref.item;

  console.log('in updateRelationships');
  var promises = (0, _keys2.default)(relationships).map(function (relationKey) {
    var relationship = relationships[relationKey];
    return updateRelationship({
      item: item,
      openApiClient: openApiClient,
      relationKey: relationKey,
      relationship: relationship
    });
  });
  return _promise2.default.all(promises);
}

module.exports = {
  dep: dep,
  updateRelationships: updateRelationships
};