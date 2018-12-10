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
  { item, log = defaultLog, openApiClient } = {}
) {
  return Promise.resolve().then(() => {
    if (!item) {
      throw new Error('item required')
    }

    const { relationships } = item
    const {
      relationshipsToIncludeInRequest,
      relationshipsToAssociateSeparately,
    } = dep.splitRelationships({
      itemResourceType: item.type,
      relationships,
    })
    log.debug('createWithRelationships', {
      relationshipsToAssociateSeparately,
      relationshipsToIncludeInRequest,
    })
    return dep
      .create({
        item: {
          ...item,
          relationships: relationshipsToIncludeInRequest,
        },
        log: log.scope(),
        openApiClient,
        resourcesToModify: [item.type],
      })
      .then(response => {
        return dep
          .updateRelationships({
            item: response.data,
            log: log.scope(),
            openApiClient,
            relationships: relationshipsToAssociateSeparately,
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
