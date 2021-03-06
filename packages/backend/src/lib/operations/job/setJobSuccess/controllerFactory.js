const getCurrentUTCTimestamp = require('common/src/date/getCurrentUTCTimestamp')
const update = require('../../crud/update/controllerFactory')

module.exports = function setJobSuccess(options) {
  const updateRequestHandler = update(options)

  return ({ request }) => {
    const { body: { data: input = {} } = {} } = request

    const updatedInput = {
      ...input,
      attributes: {
        ...(input.attributes || {}),
        operationRequest: {},
        succeededAt: getCurrentUTCTimestamp(),
      },
    }

    // Do custom validate
    // Fetch by id and manipulate
    return updateRequestHandler({
      request: {
        ...request,
        body: {
          data: {
            ...updatedInput,
          },
        },
      },
    })
  }
}
