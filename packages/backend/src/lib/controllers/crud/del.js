const createObjectResponse = require('../utilities/transformations/createObjectResponse')

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
    const preHookPromises = preHooks.map(preHook => {
      return preHook({
        fileInteractor,
        request,
        requestId,
        resource,
        serviceInteractor,
        user,
      })
    })

    return Promise.all(preHookPromises).then(() => {
      const { pathParams: { id } } = request

      return model
        .deactivate({ id })
        .then(({ item } = {}) => {
          const promises = postHooks.map(postHook => {
            return postHook({
              fileInteractor,
              item,
              requestId,
              resource,
              serviceInteractor,
              user,
            })
          })

          return Promise.all(promises).then(() => {
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
