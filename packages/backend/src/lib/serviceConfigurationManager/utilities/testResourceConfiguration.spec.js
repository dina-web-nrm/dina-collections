const { describe: unitDescribe } = require('common/src/testUtilities/envUnit')
const testResourceSpecification = require('./testResourceConfiguration')

unitDescribe('lib/services/utilities/testResourceConfiguration', () => {
  const sampleSpecification = {
    basePath: '/api/something',
  }
  testResourceSpecification(sampleSpecification)
})
