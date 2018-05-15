import { getRelationshipFormat } from '../../../utilities'

export default function createGetRelationshipItemOrItems({
  getRelationshipItem,
  getRelationshipItems,
  resourceBaseGlobalSelectors,
}) {
  return function getRelationshipItemOrItems(
    state,
    { itemId, relationKey } = {}
  ) {
    const item = resourceBaseGlobalSelectors.getOne(state, itemId)

    if (!item) {
      return undefined
    }

    const format = getRelationshipFormat({ item, relationKey })
    if (!format) {
      return undefined
    }

    if (format === 'array') {
      return getRelationshipItems(state, { itemId, relationKey })
    }
    return getRelationshipItem(state, { itemId, relationKey })
  }
}
