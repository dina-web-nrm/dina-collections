'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLog = require('../../log');

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./updateRelationship'),
    updateRelationship = _require2.updateRelationship;

var dep = new Dependor({
  updateRelationship: updateRelationship
});

var defaultLog = createLog('common:jsonApiClient:updateRelationships');

function updateRelationships(_ref) {
  var item = _ref.item,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? defaultLog : _ref$log,
      openApiClient = _ref.openApiClient,
      relationships = _ref.relationships;

  log.debug('updateRelationships: start', relationships);
  var promises = (0, _keys2.default)(relationships).map(function (relationKey) {
    var relationship = relationships[relationKey];
    return updateRelationship({
      item: item,
      log: log.scope(),
      openApiClient: openApiClient,
      relationKey: relationKey,
      relationship: relationship
    });
  });
  return _promise2.default.all(promises).then(function (result) {
    log.debug('updateRelationships: done');
    return result;
  });
}

module.exports = {
  dep: dep,
  updateRelationships: updateRelationships
};