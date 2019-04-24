const nestedToCoreSync = require('./nestedToCoreSync')

module.exports = function nestedToCore(...args) {
  return Promise.resolve().then(() => {
    return nestedToCoreSync(...args)
  })
}
