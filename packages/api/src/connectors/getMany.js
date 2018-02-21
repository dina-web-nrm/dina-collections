const createArrayResponse = require('../lib/api/utilities/createArrayResponse')
const transformOutput = require('./transformations/outputArray')

module.exports = function getMany({ modelName, resource, models }) {
  const model = models[modelName]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  return () => {
    return model
      .getWhere({ where: {} })
      .then(transformOutput)
      .then(items => {
        return createArrayResponse({
          items,
          type: resource,
        })
      })
  }
}
