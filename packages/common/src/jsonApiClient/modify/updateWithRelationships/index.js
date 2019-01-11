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
    relationshipsToModify,
    resourcePath,
  } = {}
) {
  return Promise.resolve().then(() => {
    if (!item) {
      throw new Error('item required')
    }

    const { relationships } = item
    const {
      relationshipsToNotUpdate,
      relationshipsToIncludeInRequest,
      relationshipsToAssociateSeparately,
    } = dep.splitRelationships({
      itemResourceType: item.type,
      relationships,
      relationshipsToModify,
      resourcePath,
    })

    if (relationshipsToNotUpdate && relationshipsToNotUpdate.length) {
      log
        .scope()
        .debug(
          `${
            resourcePath
          } -> not updating relationships: ${relationshipsToNotUpdate.join(
            ', '
          )}`
        )
    }

    if (
      relationshipsToIncludeInRequest &&
      Object.keys(relationshipsToIncludeInRequest).length
    ) {
      log
        .scope()
        .debug(
          `${resourcePath} -> updating relationships as part of ${
            resourcePath
          } request: ${Object.keys(relationshipsToIncludeInRequest).join(', ')}`
        )
    }

    return dep
      .update({
        item: {
          ...item,
          relationships: relationshipsToIncludeInRequest,
        },
        log: log.scope(`${resourcePath} -> update`),
        openApiClient,
        resourcePath,
        resourcesToModify: [item.type],
      })
      .then(response => {
        return dep
          .updateRelationships({
            item: response.data,
            log: log.scope(`${resourcePath} -> updateRelationships`),
            openApiClient,
            relationships: relationshipsToAssociateSeparately,
            resourcePath,
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
