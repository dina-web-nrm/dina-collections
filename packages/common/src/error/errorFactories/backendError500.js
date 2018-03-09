const backendError = require('./backendError')

module.exports = function backendError500({ ...args }) {
  return backendError({
    ...args,
    status: 500,
  })
}
