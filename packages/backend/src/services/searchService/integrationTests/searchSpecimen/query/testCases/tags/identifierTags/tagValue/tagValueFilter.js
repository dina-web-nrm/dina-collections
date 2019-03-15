const createQueryTestCasedFromRegexpCases = require('../../../../../../utilities/createQueryTestCasedFromRegexpCases')
const regexpBuilderSampleDataTaxonomyTestSpecification = require('../../../../../../utilities/regexpBuilder/testCases/sampleData/identifierTags')

const regexpTestCases = createQueryTestCasedFromRegexpCases(
  regexpBuilderSampleDataTaxonomyTestSpecification
)

module.exports = [
  {
    expect: { count: 0 },
    filters: { tagValue: '11111' },
    title: 'returns 0 matching identifiers for non existing tagValue',
  },
  {
    expect: { count: 1 },
    filters: { tagValue: '530183' },
    title: 'returns 1 matching identifiers for exact matching tagValue',
  },
  {
    expect: {
      count: 1,
      items: [
        {
          count: 1,
          tagType: 'catalog-no',
        },
      ],
    },
    filters: { tagValue: '53018*' },
    title: 'returns 1 matching identifiers for 53018*',
  },
  {
    expect: {
      count: 2,
      items: [
        {
          count: 1,
          tagType: 'catalog-no',
        },
        {
          count: 1,
          tagType: 'catalog-no',
        },
      ],
    },
    filters: { tagValue: '53*' },
    title: 'returns 2 matching identifiers for 53*',
  },
  {
    expect: {
      count: 9,
      items: [1, 1, 1, 1, 1, 1, 1, 1, 1].map(count => {
        return {
          count,
        }
      }),
    },
    filters: { tagValue: '5*' },
    title: 'returns 9 matching identifiers for 5*',
  },
  {
    expect: { count: 25 },
    filters: { tagValue: '*5*' },
    title: 'returns 25 matching identifiers for *5*',
  },
  ...regexpTestCases,
]
