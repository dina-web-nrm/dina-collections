'use strict';

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./recursiveUpdate'),
    recursiveUpdate = _require2.recursiveUpdate;

var _require3 = require('./recursiveCreate'),
    recursiveCreate = _require3.recursiveCreate;

var _require4 = require('./modifyIncludes/modifyIncludedRelationshipItem'),
    setModifyIncludesDependencies = _require4.setDependencies;

var dep = new Dependor({
  recursiveCreate: recursiveCreate,
  recursiveUpdate: recursiveUpdate,
  setModifyIncludesDependencies: setModifyIncludesDependencies
});

function setDependencies() {
  dep.setModifyIncludesDependencies({
    recursiveCreate: dep.recursiveCreate,
    recursiveUpdate: dep.recursiveUpdate
  });
}

module.exports = {
  dep: dep,
  setDependencies: setDependencies
};