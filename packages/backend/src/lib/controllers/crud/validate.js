const createObjectResponse = require('../utilities/transformations/createObjectResponse')
const applyHooks = require('../utilities/applyHooks')

module.exports = function validate({
  fileInteractor,
  models,
  operation = {},
  serviceInteractor,
}) {
  const { preHooks = [], resource } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  if (!model.create) {
    throw new Error(`Model missing required method: create for ${resource}`)
  }

  return ({ request, user, requestId }) => {
    return applyHooks({
      fileInteractor,
      hooks: preHooks,
      request,
      requestId,
      resource,
      serviceInteractor,
      user,
    }).then(() => {
      return createObjectResponse({
        data: {},
        // id: output.id,
        status: 200,
        type: resource,
      })
    })
  }
}
