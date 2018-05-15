import { getRelationshipItems as getRelationshipObjects } from '../../../utilities'

export default function createGetRelationshipItems({
  resourceBaseGlobalSelectors,
  getGlobalSelectors,
}) {
  return function getRelationshipItems(state, { itemId, relationKey } = {}) {
    const item = resourceBaseGlobalSelectors.getOne(state, itemId)
    if (!item) {
      return undefined
    }
    const relationshipItems = getRelationshipObjects({
      item,
      relationKey,
    })

    if (!relationshipItems.length) {
      return undefined
    }
    const relationshipItemType = relationshipItems[0].type
    const globalSelectors = getGlobalSelectors()
    const relationshipSelectors =
      globalSelectors && globalSelectors[relationshipItemType]

    if (!relationshipSelectors) {
      return undefined
    }
    return relationshipItems.map(relatonshipItem => {
      return relationshipSelectors.getOne(state, relatonshipItem.id)
    })
  }
}
