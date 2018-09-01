export default function buildList({
  baseItems,
  expandedIds = {},
  fetchItemById,
  itemsObject,
  showAll = false,
}) {
  const list = []

  const walk = ({ level = 0, items = [] }) => {
    items.forEach(item => {
      const { id } = item
      const children =
        item.relationships &&
        item.relationships.children &&
        item.relationships.children.data
      const isExpandable = !!(children && children.length)
      list.push({
        id,
        isExpandable,
        level,
      })

      if (showAll || expandedIds[id]) {
        if (children) {
          const mappedChildren = children.map(({ id: childId }) => {
            const child = itemsObject[childId]

            if (child && child.relationships && child.relationships.children) {
              return child
            }

            fetchItemById(childId)

            return {
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
