const { describe: unitDescribe } = require('common/src/testUtilities/envUnit')
const testResourceSpecification = require('./testResourceSpecification')

unitDescribe('lib/services/utilities/testResourceSpecification', () => {
  const sampleSpecification = {
    basePath: '/api/something',
  }
  testResourceSpecification(sampleSpecification)
})
