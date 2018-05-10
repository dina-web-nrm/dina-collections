const createIncludeJobs = require('./createIncludeJobs')
const runIncludeJobs = require('./runIncludeJobs')

const fetchIncluded = ({
  items: parentItems,
  openApiClient,
  path,
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
  }).then(fetchedItems => {
    console.log('fetchedItems', fetchedItems)
    return fetchIncluded({
      items: fetchedItems,
      openApiClient,
      path,
      relationSpecification,
    }).then(fetchedItemIncludes => {
      return [...fetchedItems, ...fetchedItemIncludes]
    })
  })
}

module.exports = fetchIncluded
