const transformationFunctions = require('./transformationFunctions')

const cacheResourcesSpecifications = require('../../../../cacheResourcesSpecifications')

const resourceCacheMap = cacheResourcesSpecifications.reduce(
  (obj, { name, srcResource }) => {
    return {
      ...obj,
      [srcResource]: name,
    }
  },
  {}
)

const warmViews = cacheResourcesSpecifications.map(({ name }) => {
  return name
})

exports.updateView = {
  description: 'Transforming data from specimen',
  resolveRelations: true,
  srcResource: 'specimen',
  transformationFunctions,
}

exports.rebuildView = {
  cacheRequestsToResources: ['place'],
  description: 'Transforming data from specimen',
  resolveRelations: true,
  resourceCacheMap,
  srcResource: 'specimen',
  transformationFunctions,
  warmViews,
}
