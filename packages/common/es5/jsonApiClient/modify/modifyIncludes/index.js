'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLog = require('../../../log');

var _require = require('../../../Dependor'),
    Dependor = _require.Dependor;

var shouldModifyInclude = require('../../utilities/shouldModifyInclude');

var _require2 = require('./modifyIncludedRelationship'),
    modifyIncludedRelationship = _require2.modifyIncludedRelationship;

var _require3 = require('./stripRelationshipNotToModify'),
    stripRelationshipNotToModify = _require3.stripRelationshipNotToModify;

var dep = new Dependor({
  modifyIncludedRelationship: modifyIncludedRelationship,
  shouldModifyInclude: shouldModifyInclude,
  stripRelationshipNotToModify: stripRelationshipNotToModify
});

var defaultLog = createLog('common:jsonApiClient:modifyIncludes');

function modifyIncludes() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      includesToModify = _ref.includesToModify,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? defaultLog : _ref$log,
      openApiClient = _ref.openApiClient,
      relationships = _ref.relationships,
      relationshipsToModify = _ref.relationshipsToModify,
      resourcePath = _ref.resourcePath;

  return _promise2.default.resolve().then(function () {
    if (!openApiClient) {
      throw new Error('provide openApiClient');
    }
    if (!(relationships && (0, _keys2.default)(relationships).length)) {
      return {};
    }
    var updatedRelationships = (0, _extends3.default)({}, relationships);

    var relationKeysToModify = [];
    var relationKeysNotToModify = [];

    (0, _keys2.default)(relationships).forEach(function (relationKey) {
      if (dep.shouldModifyInclude({
        includesToModify: includesToModify,
        resourcePath: resourcePath + '.' + relationKey
      })) {
        relationKeysToModify.push(relationKey);
      } else {
        relationKeysNotToModify.push(relationKey);
      }
    });

    if (relationKeysNotToModify && relationKeysNotToModify.length) {
      log.debug(resourcePath + ' -> not updating includes: ' + relationKeysNotToModify.join(', '));
    }

    relationKeysNotToModify.forEach(function (relationKey) {
      var relationship = relationships[relationKey];
      var updatedRelationship = dep.stripRelationshipNotToModify({
        relationship: relationship
      });
      updatedRelationships[relationKey] = updatedRelationship;
    });

    var promises = relationKeysToModify.map(function (relationKey) {
      var relationship = relationships[relationKey];
      return dep.modifyIncludedRelationship({
        includesToModify: includesToModify,
        log: log,
        openApiClient: openApiClient,
        parentPath: resourcePath,
        relationKey: relationKey,
        relationship: relationship,
        relationshipsToModify: relationshipsToModify,
        resourcePath: resourcePath + '.' + relationKey
      }).then(function (updatedRelationship) {
        updatedRelationships[relationKey] = updatedRelationship;
      });
    });
    return _promise2.default.all(promises).then(function () {
      log.debug(resourcePath + ' -> includes stripped from relationships', {
        updatedRelationships: updatedRelationships
      });

      return updatedRelationships;
    });
  });
}

module.exports = {
  dep: dep,
  modifyIncludes: modifyIncludes
};