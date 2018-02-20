const createArrayResponse = require('../api/utilities/createArrayResponse')
const transformOutput = require('./transformations/outputArray')

module.exports = function getMany({ modelName, resource: resourceInput }) {
  const resource = resourceInput || modelName
  return ({ models }) => {
    const model = models[modelName]
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
