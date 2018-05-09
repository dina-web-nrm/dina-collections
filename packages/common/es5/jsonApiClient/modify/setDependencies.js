'use strict';

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./recursiveUpdate'),
    recursiveUpdate = _require2.recursiveUpdate;

var _require3 = require('./recursiveCreate'),
    recursiveCreate = _require3.recursiveCreate;

var _require4 = require('./modifyRelationshipResources/modifyRelatedResourceItem'),
    setModifyRelatedResourceItemDependencies = _require4.setDependencies;

var dep = new Dependor({
  recursiveCreate: recursiveCreate,
  recursiveUpdate: recursiveUpdate,
  setModifyRelatedResourceItemDependencies: setModifyRelatedResourceItemDependencies
});

function setDependencies() {
  dep.setModifyRelatedResourceItemDependencies({
    recursiveCreate: dep.recursiveCreate,
    recursiveUpdate: dep.recursiveUpdate
  });
}

module.exports = {
  dep: dep,
  setDependencies: setDependencies
};