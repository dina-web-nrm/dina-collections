const create = require('../crud/create')

module.exports = function createJob(options) {
  const createRequestHandler = create(options)

  return ({ request }) => {
    // Do custom validate
    return createRequestHandler({ request })
  }
}
