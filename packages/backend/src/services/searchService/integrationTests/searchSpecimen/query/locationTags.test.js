const {
  describe: apiSampleDescribe,
  hook,
} = require('common/src/testUtilities/envBackendApiSampleData')
const waitForApiRestart = require('../../../../../utilities/test/waitForApiRestart')
const testSpecification = require('./testCases/tags/locationTags')
const runApiTagTests = require('../../utilities/runApiTagTests')

apiSampleDescribe(`searchSpecimen - query - locationTags`, () => {
  hook(beforeAll, () => {
    return waitForApiRestart()
  })
  runApiTagTests(testSpecification)
})
