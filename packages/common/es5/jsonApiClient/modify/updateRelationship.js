'use strict';

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var buildOperationId = require('../../buildOperationId');

var dep = new Dependor({
  buildOperationId: buildOperationId
});

function updateRelationship(_ref) {
  var openApiClient = _ref.openApiClient,
      relationship = _ref.relationship,
      relationKey = _ref.relationKey,
      item = _ref.item;

  console.log('updateRelationship - item', item);
  var id = item.id,
      type = item.type;
  var data = relationship.data;

  var isArray = Array.isArray(data);
  if (isArray) {
    var _operationId = buildOperationId({
      operationType: 'updateRelationHasMany',
      relationKey: relationKey,
      resource: type
    });

    return openApiClient.call(_operationId, {
      body: { data: data },
      pathParams: {
        id: id
      }
    });
  }
  var operationId = buildOperationId({
    operationType: 'updateRelationHasOne',
    relationKey: relationKey,
    resource: type
  });

  return openApiClient.call(operationId, {
    body: { data: data },
    pathParams: {
      id: id
    }
  });
}

module.exports = {
  dep: dep,
  updateRelationship: updateRelationship
};