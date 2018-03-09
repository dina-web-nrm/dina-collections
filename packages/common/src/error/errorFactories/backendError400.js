const backendError = require('./backendError')

module.exports = function backendError400({ ...args }) {
  return backendError({
    ...args,
    status: 400,
  })
}
