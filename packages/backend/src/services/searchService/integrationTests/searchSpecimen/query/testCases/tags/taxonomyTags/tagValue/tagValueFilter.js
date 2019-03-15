const regexpBuilderSampleDataTaxonomyTestSpecification = require('../../../../../../utilities/regexpBuilder/testCases/sampleData/taxonomyTags')

const regexpTestCases = []
Object.keys(regexpBuilderSampleDataTaxonomyTestSpecification).forEach(key => {
  const { testCases } = regexpBuilderSampleDataTaxonomyTestSpecification[key]
  testCases.forEach(({ input, matching, only, printRequest }) => {
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
        title: `${key} - ${input}`,
      })
    }
  })
})

module.exports = [
  {
    expect: { count: 0 },

    filters: { tagValue: 'non-existing-taxon' },
    title: `returns 0 matchingfor non existing tagValue`,
  },
  {
    expect: { count: 1 },
    expectedCount: 1,
    filters: { tagValue: 'pusa hispida' },
    title: `returns 1 matching for 1 existing matching tagValue`,
  },
  {
    expect: {
      count: 2,
      items: [1, 1].map(count => {
        return {
          count,
        }
      }),
    },
    filters: { tagValue: 'pus*' },
    title: `returns 2 matching for tagValue pus*`,
  },
  ...regexpTestCases,
]
