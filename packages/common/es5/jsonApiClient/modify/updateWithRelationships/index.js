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

var _require2 = require('../update'),
    update = _require2.update;

var _require3 = require('../updateRelationships'),
    updateRelationships = _require3.updateRelationships;

var _require4 = require('../../utilities/splitRelationships'),
    splitRelationships = _require4.splitRelationships;

var dep = new Dependor({
  splitRelationships: splitRelationships,
  update: update,
  updateRelationships: updateRelationships
});

var defaultLog = createLog('common:jsonApiClient:updateWithRelationships');

function updateWithRelationships() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      item = _ref.item,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? defaultLog : _ref$log,
      openApiClient = _ref.openApiClient,
      relationshipsToModify = _ref.relationshipsToModify,
      resourcePath = _ref.resourcePath;

  return _promise2.default.resolve().then(function () {
    if (!item) {
      throw new Error('item required');
    }

    var relationships = item.relationships;

    var _dep$splitRelationshi = dep.splitRelationships({
      itemResourceType: item.type,
      relationships: relationships,
      relationshipsToModify: relationshipsToModify,
      resourcePath: resourcePath
    }),
        relationshipsToNotModify = _dep$splitRelationshi.relationshipsToNotModify,
        relationshipsToIncludeInRequest = _dep$splitRelationshi.relationshipsToIncludeInRequest,
        relationshipsToAssociateSeparately = _dep$splitRelationshi.relationshipsToAssociateSeparately;

    if (relationshipsToNotModify && relationshipsToNotModify.length) {
      log.scope().debug(resourcePath + ' -> not updating relationships: ' + relationshipsToNotModify.join(', '));
    }

    if (relationshipsToIncludeInRequest && (0, _keys2.default)(relationshipsToIncludeInRequest).length) {
      log.scope().debug(resourcePath + ' -> updating relationships as part of ' + resourcePath + ' request: ' + (0, _keys2.default)(relationshipsToIncludeInRequest).join(', '));
    }

    return dep.update({
      item: (0, _extends3.default)({}, item, {
        relationships: relationshipsToIncludeInRequest
      }),
      log: log.scope(resourcePath + ' -> update'),
      openApiClient: openApiClient,
      resourcePath: resourcePath
    }).then(function (response) {
      return dep.updateRelationships({
        item: response.data,
        log: log.scope(resourcePath + ' -> updateRelationships'),
        openApiClient: openApiClient,
        relationships: relationshipsToAssociateSeparately,
        resourcePath: resourcePath
      }).then(function () {
        return response;
      });
    });
  });
}

module.exports = {
  dep: dep,
  updateWithRelationships: updateWithRelationships
};