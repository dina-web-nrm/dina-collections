module.exports = function onlySetInTestSpecification(testSpecification) {
  let onlySet = false
  Object.keys(testSpecification).forEach(key => {
    const { testCases } = testSpecification[key]
    testCases.forEach(testCase => {
      if (testCase.only) {
        onlySet = true
      }
    })
  })
  return onlySet
}
