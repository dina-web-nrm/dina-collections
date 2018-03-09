const backendError = require('./backendError')

module.exports = function backendError404({ ...args }) {
  return backendError({
    ...args,
    status: 404,
  })
}
