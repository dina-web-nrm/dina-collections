const createControllerWrapper = require('../utilities/wrapper')

module.exports = function del(options) {
  return createControllerWrapper({
    ...options,
    enableInterceptors: false,
    enablePostHooks: true,
    enablePreHooks: true,
    requiredModelMethods: ['deactivate'],
    responseFormat: 'object',
    responseSuccessStatus: 201,
  })(({ model, request }) => {
    const { pathParams: { id } } = request

    return model.deactivate({ id }).then(({ item } = {}) => {
      return { item }
    })
  })
}
