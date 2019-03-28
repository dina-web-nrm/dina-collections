module.exports = function createPreviewAggregationTestCasesFromUnitTestCases(
  specification
) {
  const unitQueryTestCases = []
  Object.keys(specification).forEach(key => {
    const { testCases } = specification[key]
    testCases.forEach(
      ({ input, matching, only, printRequest, printResponse }) => {
        if (input && matching) {
          unitQueryTestCases.push({
            expect: {
              items: matching.map(matchingTagValue => {
                return {
                  tagValue: matchingTagValue,
                }
              }),
            },
            filters: { input: { searchString: input } },
            only,
            printRequest,
            printResponse,
            title: `${key} - ${input}`,
          })
        }
      }
    )
  })
  return unitQueryTestCases
}
