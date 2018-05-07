'use strict';

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./createWithRelationships'),
    createWithRelationships = _require2.createWithRelationships;

var dep = new Dependor({
  createWithRelationships: createWithRelationships
});

function create() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      openApiClient = _ref.openApiClient,
      resourceType = _ref.resourceType,
      userOptions = _ref.userOptions;

  var body = userOptions.body;

  return dep.createWithRelationships({
    openApiClient: openApiClient,
    resource: body,
    resourceType: resourceType
  });
}

module.exports = {
  create: create,
  dep: dep
};