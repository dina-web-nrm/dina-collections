const objectPath = require('object-path')

module.exports = function createIncludeJobs({
  parentItems = [],
  relationSpecification,
}) {
  const jobMap = {}

  parentItems.forEach(parentItem => {
    const { path: parentPath = '', relationships = {} } = parentItem
    Object.keys(relationships).forEach(relationKey => {
      const path = [parentPath, relationKey].filter(str => !!str).join('.')
      const shouldInclude = !!objectPath.get(relationSpecification, path)
      if (shouldInclude) {
        const relationship = relationships[relationKey]

        const relationshipItems = Array.isArray(relationship.data)
          ? relationship.data
          : [relationship.data]

        relationshipItems.forEach(relationshipItem => {
          if (relationshipItem) {
            if (!jobMap[path]) {
              jobMap[path] = {
                ids: [],
                type: relationshipItem.type,
              }
            }
            jobMap[path].ids.push(relationshipItem.id)
          }
        })
      }
    })
  })

  return Object.keys(jobMap).map(path => {
    return {
      ...jobMap[path],
      path,
    }
  })
}
