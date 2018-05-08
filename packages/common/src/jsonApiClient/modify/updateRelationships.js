const { Dependor } = require('../../Dependor')
const { updateRelationship } = require('./updateRelationship')

const dep = new Dependor({
  updateRelationship,
})

function updateRelationships({ relationships, resource }) {
  const promises = Object.keys(relationships).map(relationKey => {
    const relationship = relationships[relationKey]
    return updateRelationship({
      relationship,
      relationKey,
      resource,
    })
  })
  return Promise.all(promises)

  // return Object.keys(relationships).map(relationKey => {})
}

module.exports = {
  dep,
  updateRelationships,
}
