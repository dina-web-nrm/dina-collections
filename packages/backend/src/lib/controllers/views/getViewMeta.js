const createControllerWrapper = require('../utilities/wrapper')

module.exports = function getViewMeta(options) {
  return createControllerWrapper({
    ...options,
    enableInterceptors: true,
    enablePostHooks: true,
    enablePreHooks: true,
    requiredModelMethods: ['getViewMeta'],
    responseFormat: 'object',
    responseSuccessStatus: 200,
    type: 'meta',
  })(({ model }) => {
    return model.getViewMeta().then(meta => {
      return {
        item: { attributes: meta, id: 1, type: 'meta' },
      }
    })
  })
}
