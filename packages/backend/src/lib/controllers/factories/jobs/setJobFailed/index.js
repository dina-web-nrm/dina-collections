const getCurrentUTCTimestamp = require('common/src/date/getCurrentUTCTimestamp')
const update = require('../../crud/update')

// Not wrapped in controller wrapper because updateRequestHandler called.
module.exports = function setJobFailed(options) {
  const updateRequestHandler = update(options)

  return ({ request }) => {
    const { body: { data: input = {} } = {} } = request

    const updatedInput = {
      ...input,
      attributes: {
        ...(input.attributes || {}),
        failedAt: getCurrentUTCTimestamp(),
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
