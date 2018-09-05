const createLog = require('../../../utilities/log')
const createObjectResponse = require('../utilities/transformations/createObjectResponse')

const log = createLog('lib/controllers/crud/del')

module.exports = function del({ operation, models, serviceInteractor }) {
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
              item,
              requestId,
              resource,
              serviceInteractor,
              user,
            }).catch(err => {
              log.info('Error in post hook')
              log.err(err.stack)
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
