const { describe: unitDescribe } = require('common/src/testUtilities/envUnit')
const testResourceSpecification = require('../../lib/serviceConfigurationManager/createServiceSpecifications/utilities/testResourceSpecification')
const testServiceSpecification = require('../../lib/serviceConfigurationManager/createServiceSpecifications/utilities/testServiceSpecification')
const testOperationSpecification = require('../../lib/serviceConfigurationManager/createServiceSpecifications/utilities/testOperationSpecification')
const serviceSpecifications = require('../../serviceConfigurations')

unitDescribe('lib/tests/testStructure', () => {
  describe('services', () => {
    describe('serviceExport', () => {
      it('Services export object', () => {
        expect(typeof serviceSpecifications).toBe('object')
      })
    })

    describe('service: ', () => {
      Object.keys(serviceSpecifications).forEach(serviceKey => {
        describe(serviceKey, () => {
          const serviceSpecification = serviceSpecifications[serviceKey]
          it('has same name as key', () => {
            expect(serviceKey).toBe(serviceSpecification.name)
          })
          testServiceSpecification(serviceSpecification)
          if (serviceSpecification.resources) {
            describe('resource: ', () => {
              Object.keys(serviceSpecification.resources).forEach(
                resourceKey => {
                  describe(resourceKey, () => {
                    const resourceSpecification =
                      serviceSpecification.resources[resourceKey]
                    testResourceSpecification(resourceSpecification)
                    if (resourceSpecification.operations) {
                      describe('operation: ', () => {
                        resourceSpecification.operations.forEach(
                          operationSpecification => {
                            describe(operationSpecification.type, () => {
                              testOperationSpecification(operationSpecification)
                            })
                          }
                        )
                      })
                    }
                  })
                }
              )
            })
          }
        })
      })
    })
  })
})
