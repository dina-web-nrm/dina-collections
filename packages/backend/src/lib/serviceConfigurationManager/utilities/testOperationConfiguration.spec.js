const { describe: unitDescribe } = require('common/src/testUtilities/envUnit')
const testOperationSpecification = require('./testOperationConfiguration')

unitDescribe('lib/services/utilities/testOperationConfiguration', () => {
  const sampleSpecification = {
    exampleRequests: { primary: {} },
    type: 'create',
  }
  testOperationSpecification(sampleSpecification)
})
