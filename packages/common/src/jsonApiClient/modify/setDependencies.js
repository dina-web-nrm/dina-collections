const { Dependor } = require('../../Dependor')

const { recursiveUpdate } = require('./recursiveUpdate')
const { recursiveCreate } = require('./recursiveCreate')

const {
  setDependencies: setModifyRelatedResourceArrayDependencies,
} = require('./modifyRelatedResourceArray')

const {
  setDependencies: setModifyRelatedResourceObjectDependencies,
} = require('./modifyRelatedResourceObject')

const dep = new Dependor({
  recursiveCreate,
  recursiveUpdate,
  setModifyRelatedResourceArrayDependencies,
  setModifyRelatedResourceObjectDependencies,
})

function setDependencies() {
  dep.setModifyRelatedResourceArrayDependencies({
    recursiveCreate: dep.recursiveCreate,
    recursiveUpdate: dep.recursiveUpdate,
  })
  dep.setModifyRelatedResourceObjectDependencies({
    recursiveCreate: dep.recursiveCreate,
    recursiveUpdate: dep.recursiveUpdate,
  })
}

module.exports = {
  dep,
  setDependencies,
}
