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

    return dep
      .update({
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
  updateWithRelationships,
  dep,
}
