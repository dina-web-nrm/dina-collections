'use strict';

var createLog = require('../../log');

var log = createLog('common:jsonApiClient', 4);

console.log('RENAME RESOURCE TO ITEM');

module.exports = function updateRelationship(_ref) {
  var createWithRelationships = _ref.createWithRelationships,
      openApiClient = _ref.openApiClient,
      relationship = _ref.relationship;

  var isArray = Array.isArray(relationship.data);
  log.debug('relationship with format ' + (isArray ? 'array' : 'object'), relationship);
  if (isArray) {
    var relationshipItems = relationship.data;
    return relationshipItems.map(function (item) {
      return createWithRelationships({ openApiClient: openApiClient, resource: item }).then(function (_ref2) {
        var id = _ref2.id,
            type = _ref2.type;

        return {
          id: id,
          type: type
        };
      });
    }).then(function (updatedRelationships) {
      return {
        data: updatedRelationships
      };
    });
  }
  return createWithRelationships({
    openApiClient: openApiClient,
    resource: relationship.data
  }).then(function (_ref3) {
    var id = _ref3.id,
        type = _ref3.type;

    return {
      data: {
        id: id,
        type: type
      }
    };
  });
};