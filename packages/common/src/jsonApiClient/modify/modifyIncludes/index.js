const createLog = require('../../../log')
const { Dependor } = require('../../../Dependor')

const shouldModifyInclude = require('../../utilities/shouldModifyInclude')
const { modifyIncludedRelationship } = require('./modifyIncludedRelationship')
const {
  stripRelationshipNotToModify,
} = require('./stripRelationshipNotToModify')

const dep = new Dependor({
  modifyIncludedRelationship,
  shouldModifyInclude,
  stripRelationshipNotToModify,
})

const defaultLog = createLog('common:jsonApiClient:modifyIncludes')

function modifyIncludes(
  {
    includesToModify,
    log = defaultLog,
    openApiClient,
    relationships,
    relationshipsToModify,
    resourcePath,
  } = {}
) {
  return Promise.resolve().then(() => {
    if (!openApiClient) {
      throw new Error('provide openApiClient')
    }
    if (!(relationships && Object.keys(relationships).length)) {
      return {}
    }
    const updatedRelationships = { ...relationships }

    const relationKeysToModify = []
    const relationKeysNotToModify = []

    Object.keys(relationships).forEach(relationKey => {
      if (
        dep.shouldModifyInclude({
          includesToModify,
          resourcePath: `${resourcePath}.${relationKey}`,
        })
      ) {
        relationKeysToModify.push(relationKey)
      } else {
        relationKeysNotToModify.push(relationKey)
      }
    })

    if (relationKeysNotToModify && relationKeysNotToModify.length) {
      log.debug(
        `${
          resourcePath
        } -> not updating includes: ${relationKeysNotToModify.join(', ')}`
      )
    }

    relationKeysNotToModify.forEach(relationKey => {
      const relationship = relationships[relationKey]
      const updatedRelationship = dep.stripRelationshipNotToModify({
        relationship,
      })
      updatedRelationships[relationKey] = updatedRelationship
    })

    const promises = relationKeysToModify.map(relationKey => {
      const relationship = relationships[relationKey]
      return dep
        .modifyIncludedRelationship({
          includesToModify,
          log,
          openApiClient,
          parentPath: resourcePath,
          relationKey,
          relationship,
          relationshipsToModify,
          resourcePath: `${resourcePath}.${relationKey}`,
        })
        .then(updatedRelationship => {
          updatedRelationships[relationKey] = updatedRelationship
        })
    })
    return Promise.all(promises).then(() => {
      log.debug(`${resourcePath} -> includes modified`, {
        updatedRelationships,
      })

      return updatedRelationships
    })
  })
}

module.exports = {
  dep,
  modifyIncludes,
}
