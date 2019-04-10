const { describe: unitDescribe } = require('common/src/testUtilities/envUnit')
const serviceConfigurations = require('../index')

unitDescribe('services/testServiceConfiguration', () => {
  describe('serviceExport', () => {
    it('Services export serviceConfigurations object', () => {
      expect(typeof serviceConfigurations).toBe('object')
    })
  })

  Object.keys(serviceConfigurations).forEach(serviceKey => {
    describe(`Service: ${serviceKey}`, () => {
      const serviceSpecification = serviceConfigurations[serviceKey]
      it('has same name as key', () => {
        expect(serviceKey).toBe(serviceSpecification.name)
      })
    })
  })
})
