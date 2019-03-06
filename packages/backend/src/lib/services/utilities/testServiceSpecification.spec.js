const { describe: unitDescribe } = require('common/src/testUtilities/envUnit')
const testServiceSpecification = require('./testServiceSpecification')

unitDescribe('lib/services/utilities/testServiceSpecification', () => {
  const sampleSpecification = {
    info: {},
    name: 'testService',
  }
  testServiceSpecification(sampleSpecification)
})
