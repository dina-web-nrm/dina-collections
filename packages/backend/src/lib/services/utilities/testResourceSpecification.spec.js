const unitDescribe = require('common/src/testUtilities/unitDescribe')
const testResourceSpecification = require('./testResourceSpecification')

unitDescribe('lib/services/utilities/testResourceSpecification', () => {
  const sampleSpecification = {
    basePath: '/api/something',
  }
  testResourceSpecification(sampleSpecification)
})
