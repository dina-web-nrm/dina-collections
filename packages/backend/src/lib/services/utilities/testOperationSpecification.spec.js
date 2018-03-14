const testOperationSpecification = require('./testOperationSpecification')

describe('lib/services/utilities/testOperationSpecification', () => {
  const sampleSpecification = {
    exampleRequests: { primary: {} },
    type: 'create',
  }
  testOperationSpecification(sampleSpecification)
})
