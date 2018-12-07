const createLog = require('../../../log')
const { Dependor } = require('../../../Dependor')

const { update } = require('../update')
const { updateRelationships } = require('../updateRelationships')
const { splitRelationships } = require('../../utilities/splitRelationships')

const dep = new Dependor({
  splitRelationships,
  update,
  updateRelationships,
})

const defaultLog = createLog('common:jsonApiClient:updateWithRelationships')

function updateWithRelationships(
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
    log.debug('updateWithRelationships', {
      relationshipsToAssociateSeparately,
      relationshipsToIncludeInRequest,
    })
    return dep
      .update({
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
  dep,
  updateWithRelationships,
}
