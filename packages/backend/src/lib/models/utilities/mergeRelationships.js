module.exports = function mergeRelationships(
  oldRelationships,
  newRelationships
) {
  if (!oldRelationships) {
    return newRelationships
  }
  if (!newRelationships) {
    return oldRelationships
  }
  return Object.keys(newRelationships).reduce(
    (relationships, relationshipKey) => {
      const newDocRelationship = newRelationships[relationshipKey]
      if (newDocRelationship.data) {
        return {
          ...relationships,
          [relationshipKey]: newDocRelationship,
        }
      }
      return relationships
    },
    oldRelationships
  )
}
