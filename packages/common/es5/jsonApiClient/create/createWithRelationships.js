'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLog = require('../../log');

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var buildOperationId = require('../../buildOperationId');
var updateRelationships = require('./updateRelationships');

var dep = new Dependor({
  buildOperationId: buildOperationId,
  updateRelationships: updateRelationships
});

var log = createLog('common:jsonApiClient', 1);

function createWithRelationships(_ref) {
  var openApiClient = _ref.openApiClient,
      resource = _ref.resource;
  var id = resource.id,
      relationships = resource.relationships,
      type = resource.type;

  log.debug('createWithRelationships (' + type + '). relationships: ', relationships);
  return dep.updateRelationships({
    createWithRelationships: createWithRelationships,
    openApiClient: openApiClient,
    relationships: relationships
  }).then(function (updatedRelationships) {
    log.scope().debug('Updating resource(' + type + ') with updatedRelationships: ', updatedRelationships);
    var updatedResource = (0, _extends3.default)({}, resource, {
      relationships: updatedRelationships
    });
    if (id) {
      log.scope().debug('Updating resource with id: ' + id);
      return openApiClient.call(dep.buildOperationId({
        operationType: 'update',
        resource: type
      }), {
        body: updatedResource,
        pathParams: {
          id: updatedResource.id
        }
      });
    }
    log.scope().debug('Creating resource with id: ' + id);
    return openApiClient.call(dep.buildOperationId({
      operationType: 'create',
      resource: type
    }), {
      body: updatedResource
    });
  });
}

module.exports = {
  createWithRelationships: createWithRelationships,
  dep: dep
};