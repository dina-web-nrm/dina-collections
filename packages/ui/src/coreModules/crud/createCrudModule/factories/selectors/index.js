import Dependor from 'utilities/Dependor'
import createLog from 'utilities/log'
import { createSelector } from 'reselect'
import { MODULE_NAME, RESOURCES_NAMESPACE } from '../../../constants'
import createCustomSelectors from './createCustomSelectors'

export const dep = new Dependor({
  createCustomSelectors,
})

const log = createLog('coreModules:crud:selectors')
export default function createResourceSelectors(
  { resourceSpecification } = {}
) {
  const { resource } = resourceSpecification
  if (!resource) {
    throw new Error('resource required')
  }

  const { customSelectors: customSelectorsInput } = resourceSpecification

  const getLocalState = state => {
    return state[MODULE_NAME] && state[MODULE_NAME][RESOURCES_NAMESPACE]
  }

  const getLocalResourceState = localState => {
    return localState[resource]
  }

  const getItemsObject = localState => {
    const localResourceState = getLocalResourceState(localState)
    return localResourceState.items
  }

  const getAll = createSelector(getItemsObject, items => {
    return Object.values(items)
  })

  const getOne = (localState, id) => {
    const items = getItemsObject(localState)
    return items[id] || null
  }

  let resourceSelectors = {
    getAll,
    getItemsObject,
    getLocalResourceState,
    getLocalState,
    getOne,
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
