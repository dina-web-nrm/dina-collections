const {
  describe: apiSampleDescribe,
  hook,
} = require('common/src/testUtilities/envBackendApiSampleData')
const waitForApiRestart = require('../../../utilities/test/waitForApiRestart')
const { makeTestCall } = require('../../../utilities/test/testApiClient')
const resetElasticSpecimenIndex = require('../../../utilities/test/db/resetElasticSpecimenIndex')

apiSampleDescribe(`sample data`, () => {
  hook(beforeAll, () => {
    return waitForApiRestart().then(() => {
      return resetElasticSpecimenIndex()
    })
  })

  it('returns expected sample data', () => {
    return makeTestCall({
      body: {
        data: {
          attributes: {
            limit: 1000,
            sort: ['attributes.idNumeric:asc'],
          },
        },
      },
      operationId: 'searchSpecimenQuery',
      validateOutput: true,
    }).then(res => {
      expect(res.data.length).toBe(16)

      const cleanData = res.data.map(item => {
        if (item.attributes.recordEventLastModified) {
          /* eslint-disable no-param-reassign */
          item.attributes.recordEventLastModified = item.attributes.recordEventLastModified.map(
            () => {
              return 'timestamp'
            }
          )
          item.attributes.searchOnlyFields.searchDate = item.attributes.searchOnlyFields.searchDate.map(
            () => {
              return 'date'
            }
          )
          /* eslint-enable no-param-reassign */
        }
        return item
      })

      expect(cleanData).toMatchSnapshot()
    })
  })
})
