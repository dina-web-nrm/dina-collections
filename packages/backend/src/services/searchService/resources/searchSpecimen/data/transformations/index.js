const transformationFunctions = require('./transformationFunctions')
const applyTransformationFunctions = require('../../../../../../lib/data/transformations/utilities/applyTransformationFunctions')

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

exports.updateView = ({ items, serviceInteractor }) => {
  return applyTransformationFunctions({
    items,
    serviceInteractor,
    transformationFunctions,
  })
}

exports.rebuildView = ({ items, serviceInteractor }) => {
  return applyTransformationFunctions({
    items,
    resourceCacheMap,
    serviceInteractor,
    transformationFunctions,
  })
}
