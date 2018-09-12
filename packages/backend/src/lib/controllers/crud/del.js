const createObjectResponse = require('../utilities/transformations/createObjectResponse')
const applyHooks = require('../utilities/applyHooks')

module.exports = function del({
  fileInteractor,
  operation,
  models,
  serviceInteractor,
}) {
  const { resource, postHooks = [], preHooks = [] } = operation

  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  if (!model.deactivate) {
    throw new Error(`Model missing required method: deactivate for ${resource}`)
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
      const { pathParams: { id } } = request

      return model
        .deactivate({ id })
        .then(({ item } = {}) => {
          return applyHooks({
            fileInteractor,
            hooks: postHooks,
            item,
            requestId,
            resource,
            serviceInteractor,
            user,
          }).then(() => {
            return item
          })
        })
        .then(output => {
          return createObjectResponse({
            data: output,
            id: output.id,
            type: resource,
          })
        })
    })
  }
}
