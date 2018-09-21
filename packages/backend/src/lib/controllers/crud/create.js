const createControllerWrapper = require('../utilities/wrapper')
const transformInput = require('../utilities/transformations/inputObject')

module.exports = function create(options) {
  const { operation: { relations, resource } } = options
  return createControllerWrapper({
    ...options,
    enableInterceptors: true,
    enablePostHooks: true,
    enablePreHooks: true,
    requiredModelMethods: ['create'],
    responseFormat: 'object',
    responseSuccessStatus: 201,
  })(({ model, request }) => {
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
}
