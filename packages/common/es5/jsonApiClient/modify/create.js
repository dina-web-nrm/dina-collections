'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLog = require('../../log');

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var buildOperationId = require('../../buildOperationId');

var dep = new Dependor({
  buildOperationId: buildOperationId
});

var defaultLog = createLog('common:jsonApiClient:create');

function create() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      openApiClient = _ref.openApiClient,
      item = _ref.item,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? defaultLog : _ref$log,
      resourcesToModify = _ref.resourcesToModify;

  return _promise2.default.resolve().then(function () {
    if (!openApiClient) {
      throw new Error('provide openApiClient');
    }

    if (!item) {
      throw new Error('item required');
    }

    if (!item.type) {
      throw new Error('type is required');
    }

    if (item.id) {
      throw new Error('not allowed to create with id');
    }

    if (!resourcesToModify) {
      throw new Error('resourcesToModify is required');
    }

    if (!resourcesToModify.includes(item.type)) {
      throw new Error('resource: ' + item.type + ' is not included in [' + resourcesToModify.join(', ') + ']');
    }

    var type = item.type;


    var operationId = dep.buildOperationId({
      operationType: 'create',
      resource: type
    });
    var input = {
      body: { data: item }
    };

    log.debug('Create resource ' + type + ' with operationId: ' + operationId + ' input:', input);

    return openApiClient.call(operationId, input);
  });
}

module.exports = {
  create: create,
  dep: dep
};