const coreToNestedSync = require('./coreToNestedSync')

module.exports = function coreToNested(options = {}) {
  return Promise.resolve().then(() => {
    return coreToNestedSync({ ...options, asyncCoreToNested: coreToNested })
  })
}
