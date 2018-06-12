const getCurrentUTCTimestamp = require('common/src/date/getCurrentUTCTimestamp')
const update = require('../crud/update')

module.exports = function setJobFailed({ operation = {}, models }) {
  const updateRequestHandler = update({ models, operation })

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
