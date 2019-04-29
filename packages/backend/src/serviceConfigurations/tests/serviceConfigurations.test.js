const { describe: unitDescribe } = require('common/src/testUtilities/envUnit')
const serviceConfigurations = require('../index')
const testResourceConfiguration = require('../../lib/serviceConfigurationManager/utilities/testResourceConfiguration')
const testServiceConfiguration = require('../../lib/serviceConfigurationManager/utilities/testServiceConfiguration')
const testOperationConfiguration = require('../../lib/serviceConfigurationManager/utilities/testOperationConfiguration')
const testModelConfiguration = require('../../lib/serviceConfigurationManager/utilities/testModelConfiguration')

unitDescribe('services/serviceConfiguration', () => {
  describe('serviceExport', () => {
    it('Services export serviceConfigurations object', () => {
      expect(typeof serviceConfigurations).toBe('object')
    })
  })
  describe('services:', () => {
    Object.keys(serviceConfigurations).forEach(serviceKey => {
      describe(serviceKey, () => {
        const serviceConfiguration = serviceConfigurations[serviceKey]
        it('has same name as key', () => {
          expect(serviceKey).toBe(serviceConfiguration.name)
        })

        testServiceConfiguration(serviceConfiguration)

        describe('resources:', () => {
          const { resources } = serviceConfiguration
          Object.keys(resources).forEach(resourceKey => {
            describe(resourceKey, () => {
              const resourceConfiguration = resources[resourceKey]
              testResourceConfiguration(resourceConfiguration)
              describe('model', () => {
                const { model: modelConfiguration } = resourceConfiguration
                if (modelConfiguration) {
                  testModelConfiguration(modelConfiguration)
                }
              })
              describe('operations:', () => {
                const { operations } = resourceConfiguration
                operations.forEach(operationConfiguration => {
                  const describeSuffix = operationConfiguration.relationKey
                    ? ` - ${operationConfiguration.relationKey}`
                    : ''

                  describe(`${
                    operationConfiguration.type
                  }${describeSuffix}`, () => {
                    testOperationConfiguration(operationConfiguration)
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})
