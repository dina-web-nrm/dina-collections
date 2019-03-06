const { describe: unitDescribe } = require('common/src/testUtilities/envUnit')
const testOperationSpecification = require('./testOperationSpecification')

unitDescribe('lib/services/utilities/testOperationSpecification', () => {
  const sampleSpecification = {
    exampleRequests: { primary: {} },
    type: 'create',
  }
  testOperationSpecification(sampleSpecification)
})
