const getCurrentUTCTimestamp = require('common/src/date/getCurrentUTCTimestamp')
const update = require('../crud/update')

module.exports = function startJob({ operation = {}, models }) {
  const updateRequestHandler = update({ models, operation })

  return ({ request }) => {
    const { body: { data: input = {} } = {} } = request

    const updatedInput = {
      ...input,
      attributes: {
        ...(input.attributes || {}),
        startedAt: getCurrentUTCTimestamp(),
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
