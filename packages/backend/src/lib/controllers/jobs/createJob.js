const create = require('../crud/create')

module.exports = function createJob({ operation = {}, models }) {
  const createRequestHandler = create({ models, operation })

  return ({ request }) => {
    // Do custom validate
    return createRequestHandler({ request })
  }
}
