const createLog = require('../../../utilities/log')
const createObjectResponse = require('../utilities/transformations/createObjectResponse')
const transformInput = require('../utilities/transformations/inputObject')

const log = createLog('lib/controllers/crud/create')

module.exports = function create({
  operation = {},
  models,
  serviceInteractor,
}) {
  const { postHooks = [], preHooks = [], relations, resource } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  if (!model.create) {
    throw new Error(`Model missing required method: create for ${resource}`)
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
      const { body } = request
      const { data: input } = body
      return model
        .create(
          transformInput({
            input,
            relations,
            sourceResource: resource,
          })
        )
        .then(({ item } = {}) => {
          const postHookPromises = postHooks.map(postHook => {
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

          return Promise.all(postHookPromises).then(() => {
            return item
          })
        })
        .then(output => {
          return createObjectResponse({
            data: output,
            id: output.id,
            status: 201,
            type: resource,
          })
        })
    })
  }
}
