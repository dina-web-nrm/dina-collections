const { Dependor } = require('../../Dependor')

const { recursiveUpdate } = require('./recursiveUpdate')
const { recursiveCreate } = require('./recursiveCreate')

const {
  setDependencies: setModifyRelatedResourceItemDependencies,
} = require('./modifyRelationshipResources/modifyRelatedResourceItem')

const dep = new Dependor({
  recursiveCreate,
  recursiveUpdate,
  setModifyRelatedResourceItemDependencies,
})

function setDependencies() {
  dep.setModifyRelatedResourceItemDependencies({
    recursiveCreate: dep.recursiveCreate,
    recursiveUpdate: dep.recursiveUpdate,
  })
}

module.exports = {
  dep,
  setDependencies,
}
