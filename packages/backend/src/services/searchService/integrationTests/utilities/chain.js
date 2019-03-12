module.exports = function chain(testFunctions) {
  return res => {
    testFunctions.forEach(testFunction => {
      return testFunction(res)
    })
  }
}
