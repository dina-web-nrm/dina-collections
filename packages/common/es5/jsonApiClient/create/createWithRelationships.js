'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var buildOperationId = require('../../buildOperationId');
var updateRelationships = require('./updateRelationships');

var dep = new Dependor({
  buildOperationId: buildOperationId,
  updateRelationships: updateRelationships
});

function createWithRelationships(_ref) {
  var openApiClient = _ref.openApiClient,
      resource = _ref.resource;
  var relationships = resource.relationships,
      type = resource.type;

  return dep.updateRelationships({
    createWithRelationships: createWithRelationships,
    relationships: relationships
  }).then(function (updatedRelationships) {
    var updatedResource = (0, _extends3.default)({}, resource, {
      relationships: updatedRelationships
    });
    if (resource.id) {
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