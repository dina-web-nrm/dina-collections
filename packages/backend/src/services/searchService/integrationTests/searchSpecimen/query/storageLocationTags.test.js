const {
  describe: apiSampleDescribe,
  hook,
} = require('common/src/testUtilities/envBackendApiSampleData')
const waitForApiRestart = require('../../../../../utilities/test/waitForApiRestart')
const testSpecification = require('./testCases/tags/storageLocationTags')
const runApiTagTests = require('../../utilities/runApiTagTests')

apiSampleDescribe(`searchSpecimen - query - storageLocationTags`, () => {
  hook(beforeAll, () => {
    return waitForApiRestart()
  })
  runApiTagTests(testSpecification)
})
