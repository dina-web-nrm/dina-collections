const createIncludeJobs = require('./createIncludeJobs')
const runIncludeJobs = require('./runIncludeJobs')

const fetchIncluded = ({
  items: parentItems,
  openApiClient,
  relationSpecification,
}) => {
  const includeJobs = createIncludeJobs({
    parentItems,
    relationSpecification,
  })
  if (!(includeJobs && includeJobs.length)) {
    return Promise.resolve([])
  }
  return runIncludeJobs({
    includeJobs,
    openApiClient,
    relationSpecification,
  }).then(fetchedItems => {
    return fetchIncluded({
      items: fetchedItems,
      openApiClient,
      relationSpecification,
    }).then(fetchedItemIncludes => {
      return [...fetchedItems, ...fetchedItemIncludes]
    })
  })
}

module.exports = fetchIncluded
