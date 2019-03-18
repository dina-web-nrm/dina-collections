module.exports = function onlySetInTestSpecification(testSpecification) {
  let onlySet = false

  const { testCases } = testSpecification
  testCases.forEach(testCase => {
    if (testCase.only) {
      onlySet = true
    }
  })

  return onlySet
}
