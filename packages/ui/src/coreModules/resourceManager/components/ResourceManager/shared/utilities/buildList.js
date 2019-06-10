import objectPath from 'object-path'

export default function buildList({
  allItemsObject,
  baseItems,
  expandedIds = {},
  fetchItemById,
}) {
  const list = []

  const walk = ({ level = 0, items = [] }) => {
    items.forEach(item => {
      const { id } = item
      const children = objectPath.get(item, 'relationships.children.data')
      const isExpandable = !!(children && children.length)

      list.push({
        id,
        isExpandable,
        level,
      })

      if (expandedIds[id]) {
        if (children) {
          const mappedChildren = children.map(({ id: childId }) => {
            const child = allItemsObject[childId]

            if (child && child.relationships && child.relationships.children) {
              return child
            }

            fetchItemById(childId)

            return {
              id: childId,
              loading: true,
            }
          })

          walk({ items: mappedChildren, level: level + 1 })
        }
      }
    })
  }

  walk({ items: baseItems })

  return list
}