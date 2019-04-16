const coreToNestedSync = require('./coreToNestedSync')

module.exports = function coreToNested(...args) {
  return Promise.resolve().then(() => {
    return coreToNestedSync(...args)
  })
}
