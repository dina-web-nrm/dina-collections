const createLog = require('../../../log')
const { Dependor } = require('../../../Dependor')

let recursiveCreate
let recursiveUpdate
let dependenciesSet = false
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
  recursiveCreate = injectedRecursiveCreate
  recursiveUpdate = injectedRecursiveUpdate

  dependenciesSet = true
}

const dep = new Dependor({
  setDependencies,
})

const defaultLog = createLog('common:jsonApiClient:modifyRelatedResourceItem')

function modifyRelatedResourceItem({
  item,
  log = defaultLog,
  openApiClient,
  relationKey,
  resourcesToModify,
}) {
  return Promise.resolve().then(() => {
    if (!dependenciesSet) {
      throw new Error('dependencies not set')
    }
    if (!item) {
      throw new Error('item is required')
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
      return recursiveUpdate({
        item,
        log: log.scope(),
        openApiClient,
        resourcesToModify,
        resourceType: item.type,
      }).then(response => {
        const updatedItem = response.data
        const { id, type } = updatedItem
        return {
          id,
          type,
        }
      })
    }

    log.debug(`Recursive creating relation: ${relationKey}`, item)

    return recursiveCreate({
      item,
      log: log.scope(),
      openApiClient,
      resourcesToModify,
      resourceType: item.type,
    }).then(response => {
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
  modifyRelatedResourceItem,
  setDependencies: dep.setDependencies,
}
