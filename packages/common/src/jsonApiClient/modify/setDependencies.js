const { Dependor } = require('../../Dependor')

const { recursiveUpdate } = require('./recursiveUpdate')
const { recursiveCreate } = require('./recursiveCreate')

const {
  setDependencies: setModifyIncludesDependencies,
} = require('./modifyIncludes/modifyIncludedRelationshipItem')

const dep = new Dependor({
  recursiveCreate,
  recursiveUpdate,
  setModifyIncludesDependencies,
})

function setDependencies() {
  dep.setModifyIncludesDependencies({
    recursiveCreate: dep.recursiveCreate,
    recursiveUpdate: dep.recursiveUpdate,
  })
}

module.exports = {
  dep,
  setDependencies,
}
