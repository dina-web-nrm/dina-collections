'use strict';

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./modifyRelatedResources'),
    modifyRelatedResources = _require2.modifyRelatedResources;

var _require3 = require('./updateRelationships'),
    updateRelationships = _require3.updateRelationships;

var _require4 = require('./create'),
    create = _require4.create;

var dep = new Dependor({
  create: create,
  modifyRelatedResources: modifyRelatedResources,
  updateRelationships: updateRelationships
});

function recursiveCreate() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      openApiClient = _ref.openApiClient,
      resourceType = _ref.resourceType,
      item = _ref.item;

  console.log('recursiveCreate - item', item);
  var attributes = item.attributes,
      relationships = item.relationships,
      type = item.type;

  if (resourceType !== type) {
    throw new Error('Wrong type: ' + type + ' for resourceType: ' + resourceType);
  }

  return dep.modifyRelatedResources({
    openApiClient: openApiClient,
    relationships: relationships
  }).then(function (updatedRelationships) {
    console.log('recursiveCreate - updatedRelationships', updatedRelationships);
    var itemWithoutRelationships = {
      attributes: attributes,
      type: type
    };

    return dep.create({
      item: itemWithoutRelationships,
      openApiClient: openApiClient
    }).then(function (createdResource) {
      console.log('createdResource', createdResource);
      return dep.updateRelationships({
        item: createdResource.data,
        openApiClient: openApiClient,
        relationships: updatedRelationships
      }).then(function () {
        console.log('returning');
        return createdResource;
      });
    });
  });
}

module.exports = {
  dep: dep,
  recursiveCreate: recursiveCreate
};