import objectPath from 'object-path'

export default function getBottomUpLineage({ id, itemsObject, lineage }) {
  const parentId = objectPath.get(
    itemsObject,
    `${id}.relationships.parent.data.id`
  )

  if (parentId) {
    return getBottomUpLineage({
      id: parentId,
      itemsObject,
      lineage: [...lineage, parentId],
    })
  }

  return lineage
}
