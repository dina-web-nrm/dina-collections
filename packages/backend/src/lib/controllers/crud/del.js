const createControllerWrapper = require('../utilities/wrapper')

module.exports = function del(options) {
  return createControllerWrapper({
    ...options,
    enableInterceptors: false,
    enablePostHooks: true,
    enablePreHooks: true,
    requiredModelMethods: ['del'],
    responseFormat: 'object',
    responseSuccessStatus: 201,
  })(({ model, request }) => {
    const {
      pathParams: { id },
    } = request

    return model.del({ id }).then(({ item } = {}) => {
      return { item }
    })
  })
}
