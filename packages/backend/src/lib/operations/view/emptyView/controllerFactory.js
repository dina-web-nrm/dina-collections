const createControllerWrapper = require('../../utilities/wrapper')

module.exports = function emptyView(options) {
  return createControllerWrapper({
    ...options,
    enableInterceptors: false,
    enablePostHooks: false,
    enablePreHooks: false,
    requiredModelMethods: ['empty'],
    responseFormat: 'object',
    responseSuccessStatus: 200,
    type: 'object',
  })(({ model }) => {
    return model.empty().then(() => {
      return { item: {} }
    })
  })
}
