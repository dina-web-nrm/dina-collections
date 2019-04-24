const { describe: unitDescribe } = require('common/src/testUtilities/envUnit')
const testServiceSpecification = require('./testServiceConfiguration')

unitDescribe('lib/services/utilities/testServiceConfiguration', () => {
  const sampleSpecification = {
    info: {},
    name: 'testService',
  }
  testServiceSpecification(sampleSpecification)
})
