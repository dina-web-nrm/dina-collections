'use strict';

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./modifyRelatedResources'),
    modifyRelatedResources = _require2.modifyRelatedResources;

var _require3 = require('./update'),
    update = _require3.update;

var _require4 = require('./updateRelationships'),
    updateRelationships = _require4.updateRelationships;

var dep = new Dependor({
  modifyRelatedResources: modifyRelatedResources,
  update: update,
  updateRelationships: updateRelationships
});

function recursiveUpdate() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      openApiClient = _ref.openApiClient,
      resourceType = _ref.resourceType,
      item = _ref.item;

  var id = item.id,
      attributes = item.attributes,
      relationships = item.relationships,
      type = item.type;

  if (resourceType !== type) {
    throw new Error('Wrong type: ' + type + ' for resourceType: ' + resourceType);
  }

  return dep.modifyRelatedResources({
    openApiClient: openApiClient,
    relationships: relationships
  }).then(function (updatedRelationships) {
    var itemWithoutRelationships = {
      attributes: attributes,
      id: id,
      type: type
    };

    return dep.update({
      item: itemWithoutRelationships,
      openApiClient: openApiClient
    }).then(function (updatedResource) {
      return dep.updateRelationships({
        item: updatedResource.data,
        openApiClient: openApiClient,
        relationships: updatedRelationships
      }).then(function () {
        return updatedResource;
      });
    });
  });
}

module.exports = {
  dep: dep,
  recursiveUpdate: recursiveUpdate
};