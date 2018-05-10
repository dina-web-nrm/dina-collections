const objectPath = require('object-path')

module.exports = function getRelativeRelationSpecification({
  relationSpecification,
  path,
}) {
  const relativeRelationSpecification =
    path === '.'
      ? relationSpecification
      : objectPath.get(relationSpecification, path)

  if (!relativeRelationSpecification) {
    return undefined
  }

  return Object.keys(relativeRelationSpecification).reduce(
    (relationships, key) => {
      if (relativeRelationSpecification[key] !== undefined) {
        return [...relationships, key]
      }
      return relationships
    },
    []
  )
}
