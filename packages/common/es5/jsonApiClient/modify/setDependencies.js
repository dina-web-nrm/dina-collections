'use strict';

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./recursiveUpdate'),
    recursiveUpdate = _require2.recursiveUpdate;

var _require3 = require('./recursiveCreate'),
    recursiveCreate = _require3.recursiveCreate;

var _require4 = require('./modifyRelatedResourceArray'),
    setModifyRelatedResourceArrayDependencies = _require4.setDependencies;

var _require5 = require('./modifyRelatedResourceObject'),
    setModifyRelatedResourceObjectDependencies = _require5.setDependencies;

var dep = new Dependor({
  recursiveCreate: recursiveCreate,
  recursiveUpdate: recursiveUpdate,
  setModifyRelatedResourceArrayDependencies: setModifyRelatedResourceArrayDependencies,
  setModifyRelatedResourceObjectDependencies: setModifyRelatedResourceObjectDependencies
});

function setDependencies() {
  dep.setModifyRelatedResourceArrayDependencies({
    recursiveCreate: dep.recursiveCreate,
    recursiveUpdate: dep.recursiveUpdate
  });
  dep.setModifyRelatedResourceObjectDependencies({
    recursiveCreate: dep.recursiveCreate,
    recursiveUpdate: dep.recursiveUpdate
  });
}

module.exports = {
  dep: dep,
  setDependencies: setDependencies
};