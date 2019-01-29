const createNormalizedValidator = require('common/src/jsonSchema/createNormalizedValidator')
const nestedToCoreSync = require('common/src/formatObject/nestedToCoreSync')
/* eslint-disable no-param-reassign */

const validate = obj => {
  return createNormalizedValidator({
    model: 'specimen',
    throwError: false,
    type: 'config',
  })(obj)
}

const cleanRelationship = relationship => {
  const relationshipData = relationship.data
  if (relationshipData) {
    const isArray = Array.isArray(relationshipData)

    if (isArray) {
      return {
        data: relationshipData.map(item => {
          return {
            id: item.id,
            type: item.type,
          }
        }),
      }
    }
    return {
      data: {
        id: relationshipData.id,
        type: relationshipData.type,
      },
    }
  }
  return {
    data: null,
  }
}

module.exports = function nestToCore({ globalIndex, target, reporter }) {
  const { id, attributes } = target

  const coreSpecimen =
    nestedToCoreSync({
      item: attributes,
      type: 'specimen',
    }) || {}

  const errors = coreSpecimen.attributes && validate(coreSpecimen.attributes)

  if (errors || !coreSpecimen.attributes) {
    reporter.rebuildViewValidationError({
      id,
      index: globalIndex,
    })
    target.id = null
    target.attributes = null
    return
  }

  const cleanedRelationships = {}

  Object.keys(coreSpecimen.relationships).forEach(key => {
    if (key === 'physicalObjects') {
      cleanedRelationships[key] = coreSpecimen.relationships[key]
    } else {
      cleanedRelationships[key] = cleanRelationship(
        coreSpecimen.relationships[key]
      )
    }
  })
  target.relationships = cleanedRelationships
  target.attributes = coreSpecimen.attributes
}
