'use strict';

var createLog = require('../../log');

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var buildOperationId = require('../../buildOperationId');

var dep = new Dependor({
  buildOperationId: buildOperationId
});

var defaultLog = createLog('common:jsonApiClient:updateRelationship');

function updateRelationship(_ref) {
  var item = _ref.item,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? defaultLog : _ref$log,
      openApiClient = _ref.openApiClient,
      relationKey = _ref.relationKey,
      relationship = _ref.relationship;
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
    log.debug('updateRelationship (hasMany) for ' + item.type + ' -> ' + item.id + ' @ key: ' + relationKey + '. relationships: ', data);
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

  log.debug('updateRelationship (hasOne) for ' + item.type + ' -> ' + item.id + ' @ key: ' + relationKey + '. relationships: ', data);

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