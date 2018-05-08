'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var buildOperationId = require('../../buildOperationId');

var dep = new Dependor({
  buildOperationId: buildOperationId
});

function update(_ref) {
  var openApiClient = _ref.openApiClient,
      item = _ref.item;
  var id = item.id,
      type = item.type;

  if (!item.attributes) {
    return _promise2.default.resolve({ data: item });
  }

  return openApiClient.call(dep.buildOperationId({
    operationType: 'update',
    resource: type
  }), {
    body: { data: item },
    pathParams: {
      id: id
    }
  });
}

module.exports = {
  dep: dep,
  update: update
};