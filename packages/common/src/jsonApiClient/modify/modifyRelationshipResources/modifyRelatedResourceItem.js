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
  {
    item: itemInput,
    log = defaultLog,
    openApiClient,
    relationKey,
    resourcesToModify,
  } = {}
) {
  return Promise.resolve().then(() => {
    if (itemInput === null) {
      log.debug(`Not updating relation: ${relationKey}, it is null`)
      return null
    }

    if (!itemInput) {
      throw new Error('missing item and it is not null')
    }

    const item = itemInput

    if (!resourcesToModify.includes(itemInput.type)) {
      return {
        id: itemInput.id,
        type: itemInput.type,
      }
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
