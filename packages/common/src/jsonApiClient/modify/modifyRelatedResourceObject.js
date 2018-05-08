const { Dependor } = require('../../Dependor')

let recursiveCreate
let recursiveUpdate
const setDependencies = dependencies => {
  /* eslint-disable prefer-destructuring */
  recursiveCreate = dependencies.recursiveCreate
  recursiveUpdate = dependencies.recursiveUpdate
  /* eslint-enable prefer-destructuring */
}

const dep = new Dependor({
  setDependencies,
})

function modifyRelatedResourceObject({ openApiClient, relationship }) {
  const item = relationship.data
  const method = item.id ? recursiveUpdate : recursiveCreate
  return method({
    item,
    openApiClient,
    resourceType: item.type,
  }).then(({ data }) => {
    const { id, type } = data
    return {
      data: {
        id,
        type,
      },
    }
  })
}

module.exports = {
  modifyRelatedResourceObject,
  setDependencies: dep.setDependencies,
}
