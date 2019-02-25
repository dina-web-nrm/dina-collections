const createControllerWrapper = require('../utilities/wrapper')
const transformInput = require('../utilities/transformations/inputObject')

module.exports = function update(options) {
  const {
    operation: { relations, resource },
  } = options

  return createControllerWrapper({
    ...options,
    enableInterceptors: false,
    enablePostHooks: true,
    enablePreHooks: true,
    requiredModelMethods: ['update'],
    responseFormat: 'object',
    responseSuccessStatus: 200,
  })(({ model, request }) => {
    const { body: { data: input = {} } = {} } = request
    const {
      pathParams: { id },
    } = request

    return model
      .update({
        id,
        ...transformInput({ input, relations, sourceResource: resource }),
      })
      .then(({ item } = {}) => {
        return { item }
      })
  })
}
