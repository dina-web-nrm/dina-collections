const testServiceSpecification = require('./testServiceSpecification')

describe('lib/services/utilities/testServiceSpecification', () => {
  const sampleSpecification = {
    info: {},
    name: 'testService',
  }
  testServiceSpecification(sampleSpecification)
})
