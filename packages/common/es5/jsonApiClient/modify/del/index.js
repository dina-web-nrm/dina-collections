'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLog = require('../../../log');

var _require = require('../../../Dependor'),
    Dependor = _require.Dependor;

var buildOperationId = require('../../../buildOperationId');

var dep = new Dependor({
  buildOperationId: buildOperationId
});

var defaultLog = createLog('common:jsonApiClient:create');

function del(_ref) {
  var _ref$log = _ref.log,
      log = _ref$log === undefined ? defaultLog : _ref$log,
      openApiClient = _ref.openApiClient,
      resourceType = _ref.resourceType,
      userOptions = _ref.userOptions;

  return _promise2.default.resolve().then(function () {
    if (!openApiClient) {
      throw new Error('provide openApiClient');
    }

    var operationId = dep.buildOperationId({
      operationType: 'del',
      resource: resourceType
    });

    log.debug('Delete resource ' + resourceType + ' with operationId: ' + operationId + ' input:', userOptions);

    return openApiClient.call(operationId, userOptions);
  });
}

module.exports = {
  del: del,
  dep: dep
};