const { makeTestCall } = require('./testApiClient')

module.exports = function waitForApiRestart({
  operationId = 'getStatus',
  maxTime = 5000,
} = {}) {
  return new Promise((resolve, reject) => {
    let timedOut = false

    setTimeout(() => {
      timedOut = true
    }, maxTime)

    const poll = () => {
      makeTestCall({
        operationId,
        validateInput: false,
        validateOutput: false,
      })
        .then(() => {
          resolve()
        })
        .catch(() => {
          if (timedOut) {
            return reject()
          }
          return setTimeout(() => {
            poll()
          }, 1000)
        })
    }
    poll()
  })
}
