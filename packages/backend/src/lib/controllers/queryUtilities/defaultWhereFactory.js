module.exports = function defaultWhereFactory() {
  return function whereFunction() {
    return Promise.resolve({})
  }
}
