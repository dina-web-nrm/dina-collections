const { describe: unitDescribe } = require('common/src/testUtilities/envUnit')
const runTests = require('./runTests')

module.exports = function createUnitTest({ resource, testSpecification }) {
  unitDescribe(`searchSpecimen - ${resource} - unitTest`, () => {
    runTests({ resource, testSpecification })
  })
}
