const testResourceSpecification = require('./testResourceSpecification')

describe('lib/services/utilities/testResourceSpecification', () => {
  const sampleSpecification = {
    basePath: '/api/something',
  }
  testResourceSpecification(sampleSpecification)
})
