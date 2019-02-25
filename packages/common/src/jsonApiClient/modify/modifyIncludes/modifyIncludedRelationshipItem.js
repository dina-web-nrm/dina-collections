const createLog = require('../../../log')
const { Dependor } = require('../../../Dependor')
const shouldModifyInclude = require('../../utilities/shouldModifyInclude')

const dep = new Dependor({
  shouldModifyInclude,
})

const setDependencies = ({
  recursiveCreate: injectedRecursiveCreate,
  recursiveUpdate: injectedRecursiveUpdate,
} = {}) => {
  if (!injectedRecursiveCreate) {
    throw new Error('recursiveCreate is required')
  }

  if (!injectedRecursiveUpdate) {
    throw new Error('recursiveUpdate is required')
  }

  dep.add({
    recursiveCreate: injectedRecursiveCreate,
    recursiveUpdate: injectedRecursiveUpdate,
  })
}

const defaultLog = createLog(
  'common:jsonApiClient:modifyIncludedRelationshipItem'
)

function modifyIncludedRelationshipItem({
  includesToModify,
  relationshipsToModify,
  item: itemInput,
  log = defaultLog,
  openApiClient,
  relationKey,
  resourcePath,
} = {}) {
  return Promise.resolve().then(() => {
    if (itemInput === null) {
      log.debug(`Not modifying ${relationKey}, it is null`)
      return null
    }

    if (!itemInput) {
      throw new Error('missing item and it is not null')
    }

    const item = itemInput

    if (item.id) {
      if (!(item.attributes || item.relationships)) {
        log.debug(
          `Not modifying ${relationKey}, id:${
            item.id
          }. has no attributes or relationships`,
          item
        )
        return {
          id: item.id,
          type: item.type,
        }
      }

      return dep
        .recursiveUpdate({
          includesToModify,
          item,
          log,
          openApiClient,
          relationshipsToModify,
          resourcePath,
          resourceType: item.type,
        })
        .then(response => {
          const updatedItem = response.data
          const { id, type } = updatedItem
          return {
            id,
            type,
          }
        })
    }

    return dep
      .recursiveCreate({
        includesToModify,
        item,
        log,
        openApiClient,
        relationshipsToModify,
        resourcePath,
        resourceType: item.type,
      })
      .then(response => {
        const createdItem = response.data
        const { id, type } = createdItem
        return {
          id,
          type,
        }
      })
  })
}

module.exports = {
  dep,
  modifyIncludedRelationshipItem,
  setDependencies,
}
