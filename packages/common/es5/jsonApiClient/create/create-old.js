'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = {
  type: 'specimen',
  attributes: {},
  relationships: {
    physicalUnits: {
      data: [{
        type: 'physicalUnits',
        relationships: {
          collectingEvent: {
            data: {
              type: 'collectingEvent',
              attributes: {}
            }
          },
          storageLocation: {
            data: {
              type: 'storageLocation',
              id: '1234'
            }
          }
        }
      }]
    }
  }
};

var updateRelationship = function updateRelationship(relationship) {
  var isArray = Array.isArray(relationship.data);
  if (isArray) {
    var relationshipItems = relationship.data;
    return relationshipItems.map(function (item) {
      return createWithRelationships(item).then(function (_ref) {
        var id = _ref.id,
            type = _ref.type;

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
  return createWithRelationships(relationship.data).then(function (_ref2) {
    var id = _ref2.id,
        type = _ref2.type;

    return {
      data: {
        id: id,
        type: type
      }
    };
  });
};

var updateRelationships = function updateRelationships(relationships) {
  if (!relationships) {
    return _promise2.default.resolve(relationships);
  }
  var updatedRelationships = (0, _extends3.default)({}, relationships);
  var promises = [];
  if (relationships) {
    (0, _keys2.default)(relationships).forEach(function (relationshipKey) {
      var relationship = relationships[relationshipKey];
      promises.push(updateRelationship(relationship).then(function (updatedRelationship) {
        updatedRelationships[relationshipKey] = updatedRelationship;
      }));
    });
  }
  return _promise2.default.all(promises).then(function () {
    return updatedRelationships;
  });
};

var createWithRelationships = function createWithRelationships(resource) {
  var relationships = resource.relationships;

  return updateRelationships(relationships).then(function (updatedRelationships) {
    if (resource.id) {
      return updateResource((0, _extends3.default)({}, resource, {
        relationships: updatedRelationships
      }));
    }
    return createResource((0, _extends3.default)({}, resource, {
      relationships: updatedRelationships
    }));
  });
};