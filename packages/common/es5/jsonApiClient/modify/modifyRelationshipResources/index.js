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

var _require2 = require('./modifyRelationshipResource'),
    modifyRelationshipResource = _require2.modifyRelationshipResource;

var dep = new Dependor({
  modifyRelationshipResource: modifyRelationshipResource
});

var defaultLog = createLog('common:jsonApiClient:recursiveCreate');

function modifyRelationshipResources() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$log = _ref.log,
      log = _ref$log === undefined ? defaultLog : _ref$log,
      openApiClient = _ref.openApiClient,
      relationships = _ref.relationships,
      resourcesToModify = _ref.resourcesToModify;

  return _promise2.default.resolve().then(function () {
    if (!openApiClient) {
      throw new Error('provide openApiClient');
    }
    if (!(relationships && (0, _keys2.default)(relationships).length)) {
      return {};
    }
    var updatedRelationships = (0, _extends3.default)({}, relationships);

    log.debug('Modify relationship resources:');
    var promises = (0, _keys2.default)(relationships).map(function (relationKey) {
      var relationship = relationships[relationKey];
      return dep.modifyRelationshipResource({
        log: log.scope(),
        openApiClient: openApiClient,
        relationKey: relationKey,
        relationship: relationship,
        resourcesToModify: resourcesToModify
      }).then(function (updatedRelationship) {
        updatedRelationships[relationKey] = updatedRelationship;
      });
    });
    return _promise2.default.all(promises).then(function () {
      log.debug('Modify relationship resources done');
      return updatedRelationships;
    });
  });
}

module.exports = {
  dep: dep,
  modifyRelationshipResources: modifyRelationshipResources
};