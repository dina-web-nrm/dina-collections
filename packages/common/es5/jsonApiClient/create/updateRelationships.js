'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateRelationship = require('./updateRelationship');

module.exports = function updateRelationships(_ref) {
  var createWithRelationships = _ref.createWithRelationships,
      relationships = _ref.relationships;

  if (!relationships) {
    return _promise2.default.resolve(relationships);
  }
  var updatedRelationships = (0, _extends3.default)({}, relationships);
  var promises = [];
  if (relationships) {
    (0, _keys2.default)(relationships).forEach(function (relationshipKey) {
      var relationship = relationships[relationshipKey];
      promises.push(updateRelationship({ createWithRelationships: createWithRelationships, relationship: relationship }).then(function (updatedRelationship) {
        updatedRelationships[relationshipKey] = updatedRelationship;
      }));
    });
  }
  return _promise2.default.all(promises).then(function () {
    return updatedRelationships;
  });
};