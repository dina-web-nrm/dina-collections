module.exports = function createIncludeJobs({ parentItems = [] }) {
  const jobMap = {}

  parentItems.forEach(parentItem => {
    const { path: parentPath = '.', relationships = {} } = parentItem

    Object.keys(relationships).forEach(relationshipKey => {
      const path = `${parentPath}.${relationshipKey}`
      const relationship = relationships[relationshipKey]

      const relationshipItems = Array.isArray(relationship.data)
        ? relationship.data
        : [relationship.data]

      relationshipItems.forEach(relationshipItem => {
        if (!jobMap[path]) {
          jobMap[path] = {
            ids: [],
            type: relationshipItem.type,
          }
        }
        jobMap[path].ids.push(relationshipItem.id)
      })
    })
  })

  return Object.keys(jobMap).map(path => {
    return {
      path,
      ...jobMap[path],
    }
  })
}
