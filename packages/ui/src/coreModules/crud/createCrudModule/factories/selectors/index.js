import Dependor from 'utilities/Dependor'
import createLog from 'utilities/log'
import { createSelector } from 'reselect'
import createCustomSelectors from './createCustomSelectors'
import getLocalState from './getLocalState'

export const dep = new Dependor({
  createCustomSelectors,
  getLocalState,
})

const log = createLog('coreModules:crud:selectors')
export default function createResourceSelectors({
  resourceSpecification,
} = {}) {
  const { resource } = resourceSpecification
  if (!resource) {
    throw new Error('resource required')
  }

  const { customSelectors: customSelectorsInput } = resourceSpecification

  const getLocalResourceState = localState => {
    return localState[resource]
  }

  const getItemsObject = localState => {
    const localResourceState = getLocalResourceState(localState)
    return localResourceState.items
  }

  const getAll = createSelector(
    getItemsObject,
    items => {
      return Object.values(items)
    }
  )

  const getOne = (localState, id) => {
    const itemsObject = getItemsObject(localState)
    return itemsObject[id] || null
  }

  const getOneByLid = (localState, lid) => {
    const items = getAll(localState) || []
    const res = items.find(({ attributes }) => {
      return attributes && attributes.lid === lid
    })
    return res || null
  }

  let resourceSelectors = {
    getAll,
    getItemsObject,
    getLocalResourceState,
    getLocalState: dep.getLocalState,
    getOne,
    getOneByLid,
  }

  if (customSelectorsInput) {
    const customSelectors = dep.createCustomSelectors({
      customSelectorsInput,
      resourceSelectors,
    })
    resourceSelectors = {
      ...resourceSelectors,
      ...customSelectors,
    }
  }

  Object.keys(resourceSelectors).forEach(selectorName => {
    log.info(`Adding selector ${resource}.${selectorName}`)
  })

  return resourceSelectors
}
