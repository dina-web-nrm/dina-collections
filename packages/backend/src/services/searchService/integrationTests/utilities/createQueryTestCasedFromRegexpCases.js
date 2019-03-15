module.exports = function createQueryTestCasedFromRegexpCases(specification) {
  const regexpTestCases = []
  Object.keys(specification).forEach(key => {
    const { testCases } = specification[key]
    testCases.forEach(
      ({ input, matching, only, printRequest, printResponse }) => {
        if (input && matching) {
          regexpTestCases.push({
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
  return regexpTestCases
}
