'use strict';

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var buildOperationId = require('../../buildOperationId');

var dep = new Dependor({
  buildOperationId: buildOperationId
});

function create(_ref) {
  var openApiClient = _ref.openApiClient,
      item = _ref.item;
  var type = item.type;

  return openApiClient.call(dep.buildOperationId({
    operationType: 'create',
    resource: type
  }), {
    body: { data: item }
  });
}

module.exports = {
  create: create,
  dep: dep
};