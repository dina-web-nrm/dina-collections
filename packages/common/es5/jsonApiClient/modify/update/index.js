'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var defaultLog = createLog('common:jsonApiClient:update');

function update() {
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

    if (!item.id) {
      throw new Error('id is required');
    }

    if (!(item.attributes && (0, _keys2.default)(item.attributes).length) && !(item.relationships && (0, _keys2.default)(item.relationships).length)) {
      return {
        data: item
      };
    }

    if (!resourcesToModify) {
      throw new Error('resourcesToModify is required');
    }

    if (!resourcesToModify.includes(item.type)) {
      throw new Error('resource: ' + item.type + ' is not included in resourcesToModify: [' + resourcesToModify.join(', ') + ']');
    }

    var id = item.id,
        relationships = item.relationships,
        type = item.type;


    var operationId = dep.buildOperationId({
      operationType: 'update',
      resource: type
    });

    var input = {
      body: { data: item },
      pathParams: {
        id: id
      }
    };

    if (!relationships || !(0, _keys2.default)(relationships).length) {
      delete input.body.data.relationships;
    }

    log.debug('Create resource ' + type + ' with operationId: ' + operationId + ' input:', input);

    return openApiClient.call(operationId, input);
  });
}

module.exports = {
  dep: dep,
  update: update
};