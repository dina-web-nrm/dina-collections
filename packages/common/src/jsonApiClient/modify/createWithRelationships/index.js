const createLog = require('../../../log')
const { Dependor } = require('../../../Dependor')

const { create } = require('../create')
const { updateRelationships } = require('../updateRelationships')
const { splitRelationships } = require('../../utilities/splitRelationships')

const dep = new Dependor({
  create,
  splitRelationships,
  updateRelationships,
})

const defaultLog = createLog('common:jsonApiClient:createWithRelationships')

function createWithRelationships(
  {
    item,
    log = defaultLog,
    openApiClient,
    relationshipKeysToIncludeInBody,
    resourcesToModify,
  } = {}
) {
  return Promise.resolve().then(() => {
    if (!item) {
      throw new Error('item required')
    }

    const { relationships } = item
    const {
      relationshipsToIncludeInRequest,
      relationshipsToAssociateSeparatly,
    } = dep.splitRelationships({
      itemResourceType: item.type,
      relationshipKeysToIncludeInBody,
      relationships,
    })
    log.debug('create with relationships')
    log.debug(
      'relationships included in request: ',
      relationshipsToIncludeInRequest
    )
    log.debug(
      'relationships not included in request: ',
      relationshipsToAssociateSeparatly
    )
    return dep
      .create({
        item: {
          ...item,
          relationships: relationshipsToIncludeInRequest,
        },
        log: log.scope(),
        openApiClient,
        resourcesToModify,
      })
      .then(response => {
        return dep
          .updateRelationships({
            item: response.data,
            openApiClient,
            relationships: relationshipsToAssociateSeparatly,
          })
          .then(() => {
            return response
          })
      })
  })
}

module.exports = {
  createWithRelationships,
  dep,
}
