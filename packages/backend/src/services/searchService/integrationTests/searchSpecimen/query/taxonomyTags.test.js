const {
  describe: apiSampleDescribe,
  hook,
} = require('common/src/testUtilities/envBackendApiSampleData')
const waitForApiRestart = require('../../../../../utilities/test/waitForApiRestart')

const {
  chain,
  createRequestBuilder,
  runTestCases,
  specimenCountEquals,
  // tagTypeEquals,
} = require('../../utilities')

const resource = 'taxonomyTag'

apiSampleDescribe(`searchSpecimen - query - tags - ${resource}`, () => {
  hook(beforeAll, () => {
    return waitForApiRestart()
  })

  describe(`tag type aggregations`, () => {
    const requestBuilder = createRequestBuilder({
      aggregationFunction: 'aggregateTaxonomyTagTypes',
      aggregationType: 'tagTypes',
      filterFunction: 'searchTaxonomyTags',
      resource: 'taxonomyTag',
      tagPath: 'attributes.tags.taxonomyTags',
    })
    const testCases = [
      {
        aggregate: true,
        compareQueryResults: true,
        expectedCount: 4,
        queryTypes: ['raw', 'dina'],
        testFn: res => {
          const ids = res.data.map(({ id }) => {
            return id
          })

          expect(ids).toEqual(['family', 'genus', 'order', 'species'])
        },
        title: 'returns all tag types',
      },
    ]
    runTestCases({ requestBuilder, testCases })
  })
  describe(`tag aggregations`, () => {
    const expectedTotalNumberOfTags = 38
    const requestBuilder = createRequestBuilder({
      aggregationFunction: 'aggregateTaxonomyTagValues',
      aggregationType: 'tagValues',
      filterFunction: 'searchTaxonomyTags',
      resource: 'taxonomyTag',
      tagPath: 'attributes.tags.taxonomyTags',
    })
    describe(`no filters`, () => {
      const testCases = [
        {
          aggregate: true,
          compareQueryResults: true,
          expectedCount: expectedTotalNumberOfTags,
          queryTypes: ['raw', 'dina'],
          snapshot: true,
          title: `returns all aggregated ${resource} when no filters are presen `,
        },
      ]
      runTestCases({ requestBuilder, testCases })
    })
    describe(`tagType filters`, () => {
      const expectedNumberOfFamilyTags = 10
      const expectedNumberOfGenusTags = 12
      const expectedNumberOfOrderTags = 5
      const expectedNumberOfSpeciesTags = 11
      const testCases = [
        {
          aggregate: true,
          compareQueryResults: true,
          expectedCount: expectedNumberOfFamilyTags,
          queryTypes: ['raw', 'dina'],
          tagTypes: ['family'],
          title: `returns all aggregated family ${resource}`,
        },
        {
          aggregate: true,
          compareQueryResults: true,
          expectedCount: expectedNumberOfGenusTags,
          queryTypes: ['raw', 'dina'],
          tagTypes: ['genus'],
          title: `returns all genus ${resource}`,
        },
        {
          aggregate: true,
          compareQueryResults: true,
          expectedCount: expectedNumberOfOrderTags,
          queryTypes: ['raw', 'dina'],
          tagTypes: ['order'],
          title: `returns all order ${resource}`,
        },
        {
          aggregate: true,
          compareQueryResults: true,
          expectedCount: expectedNumberOfSpeciesTags,
          queryTypes: ['raw', 'dina'],
          tagTypes: ['species'],
          title: `returns all species ${resource}`,
        },
      ]
      runTestCases({ requestBuilder, testCases })
      expect(expectedTotalNumberOfTags).toBe(
        expectedNumberOfFamilyTags +
          expectedNumberOfGenusTags +
          expectedNumberOfOrderTags +
          expectedNumberOfSpeciesTags
      )
    })
    describe(`tagValue filters`, () => {
      const testCases = [
        {
          aggregate: true,
          compareQueryResults: true,
          expectedCount: 0,
          queryTypes: ['raw', 'dina'],
          tagValue: 'non-existing-taxon',
          title: `returns 0 matching ${resource} for non existing tagValue`,
        },
        {
          aggregate: true,
          compareQueryResults: true,
          expectedCount: 1,
          queryTypes: ['raw', 'dina'],
          tagValue: 'pusa hispida',
          title: `returns 1 matching ${resource} for 1 existing matching tagValue`,
        },
        {
          aggregate: true,
          compareQueryResults: true,
          expectedCount: 2,
          queryTypes: ['raw', 'dina'],
          tagValue: 'pus*',
          testFn: chain([specimenCountEquals([1, 1])]),
          title: `returns 2 matching ${resource} for tagValue pus*`,
        },
      ]

      runTestCases({ requestBuilder, testCases })
    })
  })
})
