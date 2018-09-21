const createControllerWrapper = require('../utilities/wrapper')

module.exports = function validate(options) {
  return createControllerWrapper({
    ...options,
    enableInterceptors: false,
    enablePostHooks: false,
    enablePreHooks: true,
    requiredModelMethods: [],
    responseFormat: 'object',
    responseSuccessStatus: 200,
  })(() => {
    return { item: {} }
  })
}
