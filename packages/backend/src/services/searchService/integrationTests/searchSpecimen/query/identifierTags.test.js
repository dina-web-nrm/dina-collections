const {
  describe: apiSampleDescribe,
  hook,
} = require('common/src/testUtilities/envBackendApiSampleData')
const waitForApiRestart = require('../../../../../utilities/test/waitForApiRestart')

const {
  createRequestBuilder,
  runTestCases,
  tagTypeEquals,
} = require('../../utilities')

apiSampleDescribe(`searchSpecimen - query - tags - identifier`, () => {
  hook(beforeAll, () => {
    return waitForApiRestart()
  })

  describe(`tag type aggregations`, () => {
    const buildRequest = createRequestBuilder({
      aggregationFunction: 'aggregateIdentifierTagTypes',
    })
    const testCases = [
      {
        aggregate: true,
        expectedCount: 5,
        testFn: res => {
          const ids = res.data.map(({ id }) => {
            return id
          })

          expect(ids).toEqual([
            'catalog-no',
            'old-skeleton-no',
            'old-skin-no',
            'sva-no',
            'loan-no',
          ])
        },
        title: 'returns all tag types',
      },
    ]
    runTestCases({ buildRequest, testCases })
  })
  describe(`tag aggregations`, () => {
    const buildRequest = createRequestBuilder({
      aggregationFunction: 'aggregateIdentifierTagValues',
      filterFunction: 'searchIdentifierTags',
    })
    describe(`no filters`, () => {
      const testCases = [
        {
          aggregate: true,
          expectedCount: 35,
          snapshot: true,
          title:
            'returns all aggregated identifiers when no filters are present',
        },
      ]
      runTestCases({ buildRequest, testCases })
    })
    describe(`tagType filters`, () => {
      const testCases = [
        {
          aggregate: true,
          expectedCount: 16,
          tagTypes: ['catalog-no'],
          title: 'returns all aggregated catalog-no identifiers',
        },
        {
          aggregate: true,
          expectedCount: 9,
          tagTypes: ['old-skeleton-no'],
          title: 'returns all aggregated old-skeleton-no identifiers',
        },
        {
          aggregate: true,
          expectedCount: 7,
          tagTypes: ['old-skin-no'],
          title: 'returns all aggregated old-skin-no identifiers',
        },
        {
          aggregate: true,
          expectedCount: 2,
          tagTypes: ['sva-no'],
          title: 'returns all aggregated sva-no identifiers',
        },
        {
          aggregate: true,
          expectedCount: 1,
          tagTypes: ['loan-no'],
          title: 'returns all aggregated loan-no identifiers',
        },
      ]
      runTestCases({ buildRequest, testCases })
    })
    describe(`tagValue filters`, () => {
      const testCases = [
        {
          aggregate: true,
          expectedCount: 0,
          tagValue: '11111',
          title: 'returns 0 matching identifiers for non existing tagValue',
        },
        {
          aggregate: true,
          expectedCount: 1,
          tagValue: '530183',
          title: 'returns 1 matching identifiers for exact matching tagValue',
        },
        {
          aggregate: true,
          expectedCount: 1,
          tagValue: '53018*',
          testFn: tagTypeEquals('catalog-no'),
          title: 'returns 1 matching identifiers for 53018*',
        },
        {
          aggregate: true,
          expectedCount: 2,
          tagValue: '53*',
          testFn: tagTypeEquals('catalog-no'),
          title: 'returns 2 matching identifiers for 53*',
        },
        {
          aggregate: true,
          expectedCount: 9,
          tagValue: '5*',
          title: 'returns 9 matching identifiers for 5*',
        },
        {
          aggregate: true,
          expectedCount: 25,
          tagValue: '*5*',
          title: 'returns 25 matching identifiers for *5*',
        },
      ]

      runTestCases({ buildRequest, testCases })
    })
    describe('tagType and tagValue filters ', () => {
      describe(`tagType: catalog-no`, () => {
        const testCases = [
          {
            aggregate: true,
            expectedCount: 0,
            tagTypes: ['catalog-no'],
            tagValue: '11111',
            title: 'returns 0 matching identifiers for non existing tagValue',
          },
          {
            aggregate: true,
            expectedCount: 7,
            tagTypes: ['catalog-no'],
            tagValue: '5*',
            testFn: tagTypeEquals('catalog-no'),
            title: 'returns 7 matching identifiers for 5*',
          },
          {
            aggregate: true,
            expectedCount: 1,
            tagTypes: ['catalog-no'],
            tagValue: '500001',
            testFn: tagTypeEquals('catalog-no'),
            title: 'returns 1 matching identifiers for 500001',
          },
        ]

        runTestCases({ buildRequest, testCases })
      })

      describe(`tagType: old-skeleton-no`, () => {
        const testCases = [
          {
            aggregate: true,
            expectedCount: 0,
            tagTypes: ['old-skeleton-no'],
            tagValue: '11111',
            title: 'returns 0 matching identifiers for non existing tagValue',
          },
          {
            aggregate: true,
            expectedCount: 1,
            tagTypes: ['old-skeleton-no'],
            tagValue: '5*',
            testFn: tagTypeEquals('old-skeleton-no'),
            title: 'returns 1 matching identifiers for 1*',
          },
          {
            aggregate: true,
            expectedCount: 1,
            tagTypes: ['old-skeleton-no'],
            tagValue: '1,285',
            testFn: tagTypeEquals('old-skeleton-no'),
            title: 'returns 1 matching identifiers for 1,285',
          },
        ]

        runTestCases({ buildRequest, testCases })
      })

      describe(`tagType: old-skin-no`, () => {
        const testCases = [
          {
            aggregate: true,
            expectedCount: 0,
            tagTypes: ['old-skin-no'],
            tagValue: '11111',
            title: 'returns 0 matching identifiers for non existing tagValue',
          },
          {
            aggregate: true,
            expectedCount: 2,
            tagTypes: ['old-skin-no'],
            tagValue: '1*',
            testFn: tagTypeEquals('old-skin-no'),
            title: 'returns 2 matching identifiers for 1*',
          },
          {
            aggregate: true,
            expectedCount: 1,
            tagTypes: ['old-skin-no'],
            tagValue: '1; 4406; 52',
            testFn: tagTypeEquals('old-skin-no'),
            title: 'returns 1 matching identifiers for 1; 4406; 52',
          },
        ]

        runTestCases({ buildRequest, testCases })
      })

      describe(`tagType: sva-no`, () => {
        const testCases = [
          {
            aggregate: true,
            expectedCount: 0,
            tagTypes: ['sva-no'],
            tagValue: '11111',
            title: 'returns 0 matching identifiers for non existing tagValue',
          },
          {
            aggregate: true,
            expectedCount: 2,
            tagTypes: ['sva-no'],
            tagValue: 'v0*',
            testFn: tagTypeEquals('sva-no'),
            title: 'returns 2 matching identifiers for 5*',
          },
          {
            aggregate: true,
            expectedCount: 1,
            tagTypes: ['sva-no'],
            tagValue: 'v0253/98',
            testFn: tagTypeEquals('sva-no'),
            title: 'returns 1 matching identifiers for v0253/98',
          },
        ]

        runTestCases({ buildRequest, testCases })
      })
      describe(`tagType: loan-no`, () => {
        const testCases = [
          {
            aggregate: true,
            expectedCount: 0,
            tagTypes: ['loan-no'],
            tagValue: '11111',
            title: 'returns 0 matching identifiers for non existing tagValue',
          },
          {
            aggregate: true,
            expectedCount: 1,
            tagTypes: ['loan-no'],
            tagValue: '20*',
            testFn: tagTypeEquals('loan-no'),
            title: 'returns 1 matching identifiers for 20*',
          },
          {
            aggregate: true,
            expectedCount: 1,
            tagTypes: ['loan-no'],
            tagValue: '2012-21',
            testFn: tagTypeEquals('loan-no'),
            title: 'returns 1 matching identifiers for 2012-21',
          },
        ]

        runTestCases({ buildRequest, testCases })
      })
    })
  })
})
