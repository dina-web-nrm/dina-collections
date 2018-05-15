import { getRelationshipItem as getRelationshipObject } from '../../../utilities'

export default function createGetRelationshipItem({
  resourceBaseGlobalSelectors,
  getGlobalSelectors,
}) {
  return function getRelationshipItem(state, { itemId, relationKey } = {}) {
    const item = resourceBaseGlobalSelectors.getOne(state, itemId)
    if (!item) {
      return undefined
    }
    const { id: relationshipItemId, type: relationshipItemType } =
      getRelationshipObject({
        item,
        relationKey,
      }) || {}
    if (!(relationshipItemId !== undefined && relationshipItemType)) {
      return undefined
    }
    const globalSelectors = getGlobalSelectors()

    const relationshipSelectors =
      globalSelectors && globalSelectors[relationshipItemType]
    if (!relationshipSelectors) {
      return undefined
    }

    return relationshipSelectors.getOne(state, relationshipItemId)
  }
}
