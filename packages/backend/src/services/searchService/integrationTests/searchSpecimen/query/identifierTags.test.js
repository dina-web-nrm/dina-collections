const {
  describe: apiSampleDescribe,
  hook,
} = require('common/src/testUtilities/envBackendApiSampleData')
const waitForApiRestart = require('../../../../../utilities/test/waitForApiRestart')
const resetElasticSpecimenIndex = require('../../../../../utilities/test/db/resetElasticSpecimenIndex')

const {
  chain,
  createRequestBuilder,
  runTestCases,
  specimenCountEquals,
  tagTypeEquals,
} = require('../../utilities')

apiSampleDescribe(`searchSpecimen - query - tags - identifier`, () => {
  hook(beforeAll, () => {
    return waitForApiRestart().then(() => {
      return resetElasticSpecimenIndex()
    })
  })

  describe(`tag type aggregations`, () => {
    const requestBuilder = createRequestBuilder({
      aggregationFunction: 'aggregateIdentifierTagTypes',
      aggregationType: 'tagTypes',
      filterFunction: 'searchIdentifierTags',
      resource: 'identifierTag',
      tagPath: 'attributes.tags.identifierTags',
    })
    const testCases = [
      {
        aggregate: true,
        compareQueryTypesResult: true,
        expectedCount: 5,
        queryTypes: ['raw', 'dina'],
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
    runTestCases({ requestBuilder, testCases })
  })
  describe(`tag aggregations`, () => {
    const requestBuilder = createRequestBuilder({
      aggregationFunction: 'aggregateIdentifierTagValues',
      aggregationType: 'tagValues',
      filterFunction: 'searchIdentifierTags',
      resource: 'identifierTag',
      tagPath: 'attributes.tags.identifierTags',
    })
    describe(`no filters`, () => {
      const testCases = [
        {
          aggregate: true,
          compareQueryTypesResult: true,
          expectedCount: 35,
          queryTypes: ['raw', 'dina'],
          snapshot: true,
          title:
            'returns all aggregated identifiers when no filters are present',
        },
      ]
      runTestCases({ requestBuilder, testCases })
    })
    describe(`tagType filters`, () => {
      const testCases = [
        {
          aggregate: true,
          compareQueryTypesResult: true,
          expectedCount: 16,
          queryTypes: ['raw', 'dina'],
          tagTypes: ['catalog-no'],
          title: 'returns all aggregated catalog-no identifiers',
        },
        {
          aggregate: true,
          compareQueryTypesResult: true,
          expectedCount: 9,
          queryTypes: ['raw', 'dina'],
          tagTypes: ['old-skeleton-no'],
          title: 'returns all aggregated old-skeleton-no identifiers',
        },
        {
          aggregate: true,
          compareQueryTypesResult: true,
          expectedCount: 7,
          queryTypes: ['raw', 'dina'],
          tagTypes: ['old-skin-no'],
          title: 'returns all aggregated old-skin-no identifiers',
        },
        {
          aggregate: true,
          compareQueryTypesResult: true,
          expectedCount: 2,
          queryTypes: ['raw', 'dina'],
          tagTypes: ['sva-no'],
          title: 'returns all aggregated sva-no identifiers',
        },
        {
          aggregate: true,
          compareQueryTypesResult: true,
          expectedCount: 1,
          queryTypes: ['raw', 'dina'],
          tagTypes: ['loan-no'],
          title: 'returns all aggregated loan-no identifiers',
        },
        {
          aggregate: true,
          compareQueryTypesResult: true,
          expectedCount: 3,
          queryTypes: ['raw', 'dina'],
          tagTypes: ['loan-no', 'sva-no'],
          title: 'returns all aggregated loan-no and sva-no identifiers',
        },
      ]
      runTestCases({ requestBuilder, testCases })
    })
    describe(`tagValue filters`, () => {
      const testCases = [
        {
          aggregate: true,
          compareQueryTypesResult: true,
          expectedCount: 0,
          queryTypes: ['raw', 'dina'],
          tagValue: '11111',
          title: 'returns 0 matching identifiers for non existing tagValue',
        },
        {
          aggregate: true,
          compareQueryTypesResult: true,
          expectedCount: 1,
          queryTypes: ['raw', 'dina'],
          tagValue: '530183',
          title: 'returns 1 matching identifiers for exact matching tagValue',
        },
        {
          aggregate: true,
          compareQueryTypesResult: true,
          expectedCount: 1,
          queryTypes: ['raw', 'dina'],
          tagValue: '53018*',
          testFn: chain([
            tagTypeEquals('catalog-no'),
            specimenCountEquals([1]),
          ]),
          title: 'returns 1 matching identifiers for 53018*',
        },
        {
          aggregate: true,
          compareQueryTypesResult: true,
          expectedCount: 2,
          queryTypes: ['raw', 'dina'],
          tagValue: '53*',
          testFn: chain([
            tagTypeEquals('catalog-no'),
            specimenCountEquals([1, 1]),
          ]),
          title: 'returns 2 matching identifiers for 53*',
        },
        {
          aggregate: true,
          compareQueryTypesResult: true,
          expectedCount: 9,
          queryTypes: ['raw', 'dina'],
          tagValue: '5*',
          testFn: specimenCountEquals([1, 1, 1, 1, 1, 1, 1, 1, 1]),
          title: 'returns 9 matching identifiers for 5*',
        },
        {
          aggregate: true,
          expectedCount: 25,
          queryTypes: ['raw', 'dina'],
          tagValue: '*5*',
          title: 'returns 25 matching identifiers for *5*',
        },
      ]

      runTestCases({ requestBuilder, testCases })
    })
    describe('tagType and tagValue filters ', () => {
      describe(`tagType: catalog-no`, () => {
        const testCases = [
          {
            aggregate: true,
            compareQueryTypesResult: true,
            expectedCount: 0,
            queryTypes: ['raw', 'dina'],
            tagTypes: ['catalog-no'],
            tagValue: '11111',
            title: 'returns 0 matching identifiers for non existing tagValue',
          },
          {
            aggregate: true,
            compareQueryTypesResult: true,
            expectedCount: 7,
            queryTypes: ['raw', 'dina'],
            tagTypes: ['catalog-no'],
            tagValue: '5*',
            testFn: tagTypeEquals('catalog-no'),
            title: 'returns 7 matching identifiers for 5*',
          },
          {
            aggregate: true,
            compareQueryTypesResult: true,
            expectedCount: 1,
            queryTypes: ['raw', 'dina'],
            tagTypes: ['catalog-no'],
            tagValue: '500001',
            testFn: tagTypeEquals('catalog-no'),
            title: 'returns 1 matching identifiers for 500001',
          },
        ]

        runTestCases({ requestBuilder, testCases })
      })

      describe(`tagType: old-skeleton-no`, () => {
        const testCases = [
          {
            aggregate: true,
            compareQueryTypesResult: true,
            expectedCount: 0,
            queryTypes: ['raw', 'dina'],
            tagTypes: ['old-skeleton-no'],
            tagValue: '11111',
            title: 'returns 0 matching identifiers for non existing tagValue',
          },
          {
            aggregate: true,
            compareQueryTypesResult: true,
            expectedCount: 1,
            queryTypes: ['raw', 'dina'],
            tagTypes: ['old-skeleton-no'],
            tagValue: '5*',
            testFn: tagTypeEquals('old-skeleton-no'),
            title: 'returns 1 matching identifiers for 1*',
          },
          {
            aggregate: true,
            compareQueryTypesResult: true,
            expectedCount: 1,
            queryTypes: ['raw', 'dina'],
            tagTypes: ['old-skeleton-no'],
            tagValue: '1,285',
            testFn: tagTypeEquals('old-skeleton-no'),
            title: 'returns 1 matching identifiers for 1,285',
          },
        ]

        runTestCases({ requestBuilder, testCases })
      })

      describe(`tagType: old-skin-no`, () => {
        const testCases = [
          {
            aggregate: true,
            compareQueryTypesResult: true,
            expectedCount: 0,
            queryTypes: ['raw', 'dina'],
            tagTypes: ['old-skin-no'],
            tagValue: '11111',
            title: 'returns 0 matching identifiers for non existing tagValue',
          },
          {
            aggregate: true,
            compareQueryTypesResult: true,
            expectedCount: 2,
            queryTypes: ['raw', 'dina'],
            tagTypes: ['old-skin-no'],
            tagValue: '1*',
            testFn: tagTypeEquals('old-skin-no'),
            title: 'returns 2 matching identifiers for 1*',
          },
          {
            aggregate: true,
            compareQueryTypesResult: true,
            expectedCount: 1,
            queryTypes: ['raw', 'dina'],
            tagTypes: ['old-skin-no'],
            tagValue: '1; 4406; 52',
            testFn: tagTypeEquals('old-skin-no'),
            title: 'returns 1 matching identifiers for 1; 4406; 52',
          },
        ]

        runTestCases({ requestBuilder, testCases })
      })

      describe(`tagType: sva-no`, () => {
        const testCases = [
          {
            aggregate: true,
            compareQueryTypesResult: true,
            expectedCount: 0,
            queryTypes: ['raw', 'dina'],
            tagTypes: ['sva-no'],
            tagValue: '11111',
            title: 'returns 0 matching identifiers for non existing tagValue',
          },
          {
            aggregate: true,
            compareQueryTypesResult: true,
            expectedCount: 2,
            queryTypes: ['raw', 'dina'],
            tagTypes: ['sva-no'],
            tagValue: 'v0*',
            testFn: tagTypeEquals('sva-no'),
            title: 'returns 2 matching identifiers for 5*',
          },
          {
            aggregate: true,
            compareQueryTypesResult: true,
            expectedCount: 1,
            queryTypes: ['raw', 'dina'],
            tagTypes: ['sva-no'],
            tagValue: 'v0253/98',
            testFn: tagTypeEquals('sva-no'),
            title: 'returns 1 matching identifiers for v0253/98',
          },
        ]

        runTestCases({ requestBuilder, testCases })
      })
      describe(`tagType: loan-no`, () => {
        const testCases = [
          {
            aggregate: true,
            compareQueryTypesResult: true,
            expectedCount: 0,
            queryTypes: ['raw', 'dina'],
            tagTypes: ['loan-no'],
            tagValue: '11111',
            title: 'returns 0 matching identifiers for non existing tagValue',
          },
          {
            aggregate: true,
            compareQueryTypesResult: true,
            expectedCount: 1,
            queryTypes: ['raw', 'dina'],
            tagTypes: ['loan-no'],
            tagValue: '20*',
            testFn: tagTypeEquals('loan-no'),
            title: 'returns 1 matching identifiers for 20*',
          },
          {
            aggregate: true,
            compareQueryTypesResult: true,
            expectedCount: 1,
            queryTypes: ['raw', 'dina'],
            tagTypes: ['loan-no'],
            tagValue: '2012-21',
            testFn: tagTypeEquals('loan-no'),
            title: 'returns 1 matching identifiers for 2012-21',
          },
        ]

        runTestCases({ requestBuilder, testCases })
      })
    })
  })
})
