const backendError404 = require('common/src/error/errorFactories/backendError404')
const createArrayResponse = require('../utilities/transformations/createArrayResponse')
const transformOutput = require('../utilities/transformations/outputArray')

module.exports = function getVersionsById({ operation, models }) {
  const { resource } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }

  if (!model.getWhere) {
    throw new Error(`Model missing required method: getWhere for ${resource}`)
  }

  return ({ request }) => {
    const { pathParams: { id } } = request
    return model
      .getWhere({ forceCurrentVersion: false, where: { id } })
      .then(({ items: res } = {}) => {
        if (!(res && res.length)) {
          backendError404({
            code: 'RESOURCE_NOT_FOUND_ERROR',
            detail: `${resource} with id: ${id} not found`,
          })
        }
        return res
      })
      .then(res => transformOutput(res, true))
      .then(items => {
        return createArrayResponse({
          items,
          type: resource,
        })
      })
  }
}
