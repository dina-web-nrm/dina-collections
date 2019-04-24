module.exports = function onlySetInTestSpecification(testCases) {
  let onlySet = false

  testCases.forEach(testCase => {
    if (testCase.only) {
      onlySet = true
    }
  })

  return onlySet
}
