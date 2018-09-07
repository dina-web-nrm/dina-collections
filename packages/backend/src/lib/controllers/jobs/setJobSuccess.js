const getCurrentUTCTimestamp = require('common/src/date/getCurrentUTCTimestamp')
const update = require('../crud/update')

module.exports = function setJobSuccess(options) {
  const updateRequestHandler = update(options)

  return ({ request }) => {
    const { body: { data: input = {} } = {} } = request

    const updatedInput = {
      ...input,
      attributes: {
        ...(input.attributes || {}),
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
