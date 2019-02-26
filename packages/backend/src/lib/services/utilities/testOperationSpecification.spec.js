const unitDescribe = require('common/src/testUtilities/unitDescribe')
const testOperationSpecification = require('./testOperationSpecification')

unitDescribe('lib/services/utilities/testOperationSpecification', () => {
  const sampleSpecification = {
    exampleRequests: { primary: {} },
    type: 'create',
  }
  testOperationSpecification(sampleSpecification)
})
