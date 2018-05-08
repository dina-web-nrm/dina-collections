"use strict";

var create = void 0;
var update = void 0;
var setDependencies = function setDependencies(dependencies) {
  create = dependencies.create;
  update = dependencies.update;
};

function modifyRelatedResource(_ref) {
  var openApiClient = _ref.openApiClient,
      relationship = _ref.relationship;

  var isArray = Array.isArray(relationship.data);
  if (isArray) {
    var relationshipItems = relationship.data;
    return relationshipItems.map(function (item) {
      if (item.id) {
        return update({ item: item, openApiClient: openApiClient }).then(function (_ref2) {
          var id = _ref2.id,
              type = _ref2.type;

          return {
            id: id,
            type: type
          };
        });
      }
      return create({ item: item, openApiClient: openApiClient }).then(function (_ref3) {
        var id = _ref3.id,
            type = _ref3.type;

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

  if (relationship.data.id) {
    return update({
      openApiClient: openApiClient,
      resource: relationship.data
    }).then(function (_ref4) {
      var id = _ref4.id,
          type = _ref4.type;

      return {
        data: {
          id: id,
          type: type
        }
      };
    });
  }

  return create({
    openApiClient: openApiClient,
    resource: relationship.data
  }).then(function (_ref5) {
    var id = _ref5.id,
        type = _ref5.type;

    return {
      data: {
        id: id,
        type: type
      }
    };
  });
}
module.exports = {
  modifyRelatedResource: modifyRelatedResource,
  setDependencies: setDependencies
};