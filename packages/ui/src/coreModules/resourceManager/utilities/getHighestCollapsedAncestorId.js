export default function getHighestCollapsedAncestorId({
  expandedIds,
  lineage,
}) {
  return lineage.find((childId, index) => {
    if (index === 0) {
      return false
    }

    const parentId = lineage[index - 1]

    return !!(parentId && expandedIds[parentId] && !expandedIds[childId])
  })
}
