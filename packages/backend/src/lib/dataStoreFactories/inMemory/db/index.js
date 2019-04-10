const createDb = require('./createDb')

module.exports = function connectDb() {
  return Promise.resolve().then(() => {
    return createDb()
  })
}
