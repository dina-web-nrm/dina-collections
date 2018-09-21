const createObjectResponse = require('../utilities/transformations/createObjectResponse')
const transformInput = require('../utilities/transformations/inputObject')
const applyHooks = require('../utilities/applyHooks')
const applyInterceptors = require('../utilities/applyInterceptors')
const createInterceptors = require('../utilities/createInterceptors')

module.exports = function create({
  fileInteractor,
  models,
  interceptors: customInterceptors,
  operation = {},
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

  const interceptors = createInterceptors({
    customInterceptors,
  })

  return ({ request: originalRequest, user, requestId }) => {
    return applyHooks({
      fileInteractor,
      hooks: preHooks,
      request: originalRequest,
      requestId,
      resource,
      serviceInteractor,
      user,
    }).then(() => {
      return applyInterceptors({
        interceptors,
        model,
        models,
        operation,
        request: originalRequest,
        serviceInteractor,
      })
        .then(({ request, item: itemFromInterceptors }) => {
          if (itemFromInterceptors) {
            return Promise.resolve({ item: itemFromInterceptors })
          }
          const { body } = request
          const { data: input } = body
          return model.create(
            transformInput({
              input,
              relations,
              sourceResource: resource,
            })
          )
        })
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
            status: 201,
            type: resource,
          })
        })
    })
  }
}
