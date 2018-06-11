const moment = require('moment')
const update = require('../crud/update')

module.exports = function setJobSuccess({ operation = {}, models }) {
  const updateRequestHandler = update({ models, operation })

  return ({ request }) => {
    const { body: { data: input = {} } = {} } = request

    const updatedInput = {
      ...input,
      attributes: {
        ...(input.attributes || {}),
        succeededAt: moment.utc(),
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
