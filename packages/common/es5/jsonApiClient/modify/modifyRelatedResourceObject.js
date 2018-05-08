'use strict';

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

function modifyRelatedResourceObject(_ref) {
  var openApiClient = _ref.openApiClient,
      relationship = _ref.relationship;

  var item = relationship.data;
  var method = item.id ? recursiveUpdate : recursiveCreate;
  return method({
    item: item,
    openApiClient: openApiClient,
    resourceType: item.type
  }).then(function (_ref2) {
    var data = _ref2.data;

    console.log('data', data);
    var id = data.id,
        type = data.type;

    return {
      data: {
        id: id,
        type: type
      }
    };
  });
}

module.exports = {
  modifyRelatedResourceObject: modifyRelatedResourceObject,
  setDependencies: dep.setDependencies
};