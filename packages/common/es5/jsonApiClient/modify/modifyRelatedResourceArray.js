'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var recursiveCreate = void 0;
var recursiveUpdate = void 0;
var setDependencies = function setDependencies(dependencies) {
  recursiveCreate = dependencies.recursiveCreate;
  recursiveUpdate = dependencies.recursiveUpdate;
};

var dep = new Dependor({
  setDependencies: setDependencies
});

function modifyRelatedResourceArray(_ref) {
  var openApiClient = _ref.openApiClient,
      relationship = _ref.relationship;

  console.log('modifyRelatedResourceArray', relationship);
  var relationshipItems = relationship.data;
  var promises = relationshipItems.map(function (item) {
    console.log('item', item);
    var method = item.id ? recursiveUpdate : recursiveCreate;
    return method({ item: item, openApiClient: openApiClient, resourceType: item.type }).then(function (_ref2) {
      var data = _ref2.data;

      console.log('item', item);
      console.log('data', data);
      var id = data.id,
          type = data.type;

      return {
        id: id,
        type: type
      };
    });
  });

  return _promise2.default.all(promises).then(function (updatedRelationships) {
    return {
      data: updatedRelationships
    };
  });
}

module.exports = {
  modifyRelatedResourceArray: modifyRelatedResourceArray,
  setDependencies: dep.setDependencies
};