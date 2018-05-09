'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./modifyRelatedResourceArray'),
    modifyRelatedResourceArray = _require2.modifyRelatedResourceArray;

var _require3 = require('./modifyRelatedResourceObject'),
    modifyRelatedResourceObject = _require3.modifyRelatedResourceObject;

var dep = new Dependor({
  modifyRelatedResourceArray: modifyRelatedResourceArray,
  modifyRelatedResourceObject: modifyRelatedResourceObject
});

function modifyRelatedResources(_ref) {
  var openApiClient = _ref.openApiClient,
      relationships = _ref.relationships;

  if (!relationships) {
    return _promise2.default.resolve(relationships);
  }
  var updatedRelationships = (0, _extends3.default)({}, relationships);
  var promises = [];

  (0, _keys2.default)(relationships).forEach(function (relationKey) {
    var relationship = relationships[relationKey];
    var isArray = Array.isArray(relationship.data);
    var method = isArray ? dep.modifyRelatedResourceArray : dep.modifyRelatedResourceObject;

    promises.push(method({
      openApiClient: openApiClient,
      relationship: relationship
    }).then(function (updatedRelationship) {
      updatedRelationships[relationKey] = updatedRelationship;
    }));
  });

  return _promise2.default.all(promises).then(function () {
    return updatedRelationships;
  });
}

module.exports = {
  dep: dep,
  modifyRelatedResources: modifyRelatedResources
};