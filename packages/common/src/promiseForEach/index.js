module.exports = function promiseForEach(array, fn) {
  return Promise.resolve(
    array.reduce((promise, value) => {
      return promise.then(() => {
        return Promise.resolve(fn(value))
      })
    }, Promise.resolve())
  ).then(() => {
    return undefined
  })
}
