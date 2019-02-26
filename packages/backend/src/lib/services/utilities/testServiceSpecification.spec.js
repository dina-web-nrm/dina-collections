const unitDescribe = require('common/src/testUtilities/unitDescribe')
const testServiceSpecification = require('./testServiceSpecification')

unitDescribe('lib/services/utilities/testServiceSpecification', () => {
  const sampleSpecification = {
    info: {},
    name: 'testService',
  }
  testServiceSpecification(sampleSpecification)
})
