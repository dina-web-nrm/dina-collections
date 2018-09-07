const createObjectResponse = require('../utilities/transformations/createObjectResponse')
const transformInput = require('../utilities/transformations/inputObject')

module.exports = function update({
  fileInteractor,
  operation,
  models,
  serviceInteractor,
}) {
  const { resource, relations, postHooks = [], preHooks = [] } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }

  if (!model.update) {
    throw new Error(`Model missing required method: update for ${resource}`)
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
      const { body: { data: input = {} } = {} } = request
      const { pathParams: { id } } = request

      return model
        .update({
          id,
          ...transformInput({ input, relations, sourceResource: resource }),
        })
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
