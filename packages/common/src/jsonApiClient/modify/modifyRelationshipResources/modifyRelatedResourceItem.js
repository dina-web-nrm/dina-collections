const createLog = require('../../../log')
const { Dependor } = require('../../../Dependor')

const dep = new Dependor({})

const setDependencies = (
  {
    recursiveCreate: injectedRecursiveCreate,
    recursiveUpdate: injectedRecursiveUpdate,
  } = {}
) => {
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

const defaultLog = createLog('common:jsonApiClient:modifyRelatedResourceItem')

function modifyRelatedResourceItem(
  { item, log = defaultLog, openApiClient, relationKey, resourcesToModify } = {}
) {
  return Promise.resolve().then(() => {
    if (item === null) {
      log.debug(`Not updating relation: ${relationKey}, it is null`)
      return null
    }

    if (!item) {
      throw new Error('missing item and it is not null')
    }

    if (item.id) {
      if (!(item.attributes || item.relationships)) {
        log.debug(
          `Not updating relation: ${relationKey}, id:${
            item.id
          }. has no attributes or relationships`,
          item
        )
        return {
          id: item.id,
          type: item.type,
        }
      }
      log.debug(
        `Recursive updating relation: ${relationKey}, id:${item.id}`,
        item
      )
      return dep
        .recursiveUpdate({
          item,
          log: log.scope(),
          openApiClient,
          resourcesToModify,
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

    log.debug(`Recursive creating relation: ${relationKey}`, item)

    return dep
      .recursiveCreate({
        item,
        log: log.scope(),
        openApiClient,
        resourcesToModify,
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
  modifyRelatedResourceItem,
  setDependencies,
}
