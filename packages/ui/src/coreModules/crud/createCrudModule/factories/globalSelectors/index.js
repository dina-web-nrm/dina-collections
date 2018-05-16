import Dependor from 'utilities/Dependor'
import wrapSelectors from 'utilities/wrapSelectors'
import createGetRelationshipItem from './createGetRelationshipItem'
import createGetRelationshipItems from './createGetRelationshipItems'
import createGetRelationshipItemOrItems from './createGetRelationshipItemOrItems'

export const dep = new Dependor({
  wrapSelectors,
})

export default function createGlobalSelectors({
  resourceSelectors = {},
  getGlobalSelectors,
}) {
  const resourceBaseGlobalSelectors = dep.wrapSelectors(resourceSelectors)

  const getRelationshipItem = createGetRelationshipItem({
    getGlobalSelectors,
    resourceBaseGlobalSelectors,
  })

  const getRelationshipItems = createGetRelationshipItems({
    getGlobalSelectors,
    resourceBaseGlobalSelectors,
  })

  const getRelationshipItemOrItems = createGetRelationshipItemOrItems({
    getRelationshipItem,
    getRelationshipItems,
    resourceBaseGlobalSelectors,
  })

  return {
    ...resourceBaseGlobalSelectors,
    getRelationshipItem,
    getRelationshipItemOrItems,
    getRelationshipItems,
  }
}
