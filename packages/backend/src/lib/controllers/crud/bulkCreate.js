const createControllerWrapper = require('../utilities/wrapper')
const transformInput = require('../utilities/transformations/inputArray')

module.exports = function bulkCreate(options) {
  const { operation: { relations, resource } } = options
  return createControllerWrapper({
    ...options,
    enableInterceptors: true,
    enablePostHooks: true,
    enablePreHooks: true,
    requiredModelMethods: ['bulkCreate'],
    responseFormat: 'array',
    responseSuccessStatus: 201,
  })(({ model, request }) => {
    const { body } = request
    const { data: items } = body
    return model.bulkCreate({
      items: transformInput({
        items,
        relations,
        sourceResource: resource,
      }),
      requireId: false,
    })
  })
}
