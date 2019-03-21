module.exports = function createQueryTestCasedFromUnitTestCases(specification) {
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
            filters: { tagValue: input },
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
