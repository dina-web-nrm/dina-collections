const apiDescribe = require('../../utilities/test/apiDescribe')
const { makeTestCall } = require('../../utilities/test/testApiClient')
const waitForApiRestart = require('../../utilities/test/waitForApiRestart')
const serviceDefinitions = require('../../services')
const createServices = require('../../lib/services')
// const createOperationTypeResourceOperationIdMap = require('./createOperationTypeResourceOperationIdMap')

const services = createServices({ serviceDefinitions })

const testCrudFlow = ({
  createOperationId,
  operations,
  getManyOperationId,
  getOneOperationId,
  getVersionOperationId,
  getVersionsOperationId,
  updateOperationId,
}) => {
  const testing = [
    createOperationId,
    getManyOperationId,
    getOneOperationId,
    getVersionOperationId,
    getVersionsOperationId,
    updateOperationId,
  ]
    .filter(operationId => !!operationId)
    .join(', ')

  describe(`Crud flow with ${testing}`, () => {
    const { examples } = operations[createOperationId].request
    if (examples) {
      Object.keys(examples).forEach(exampleKey => {
        const example = examples[exampleKey]
        it(`Works with createRequest example: ${exampleKey}`, () => {
          return makeTestCall({
            body: example,
            operationId: createOperationId,
            validateOutput: true,
          }).then(createdResource => {
            expect(createdResource).toBeTruthy()
            expect(createdResource.data).toBeTruthy()

            return makeTestCall({
              operationId: getOneOperationId,
              pathParams: {
                id: createdResource.data.id,
              },
              validateOutput: true,
            }).then(fetchedResource => {
              expect(fetchedResource).toBeTruthy()
              expect(fetchedResource.data).toBeTruthy()
              expect(fetchedResource.data.id).toBe(createdResource.data.id)

              return makeTestCall({
                body: example,
                operationId: createOperationId,
                validateOutput: true,
              }).then(secondCreatedResource => {
                expect(secondCreatedResource).toBeTruthy()
                expect(secondCreatedResource.data).toBeTruthy()

                return makeTestCall({
                  body: example,
                  operationId: updateOperationId,
                  pathParams: {
                    id: secondCreatedResource.data.id,
                  },
                  validateOutput: true,
                }).then(updatedCreatedResource => {
                  expect(updatedCreatedResource).toBeTruthy()
                  expect(updatedCreatedResource.data).toBeTruthy()
                  expect(updatedCreatedResource.data.id).toBe(
                    secondCreatedResource.data.id
                  )

                  return makeTestCall({
                    operationId: getManyOperationId,
                    validateOutput: true,
                  }).then(fetchedResources => {
                    expect(fetchedResources).toBeTruthy()
                    expect(fetchedResources.data).toBeTruthy()
                    expect(fetchedResources.data.length > 1).toBeTruthy()
                    if (!getVersionsOperationId) {
                      return null
                    }

                    return makeTestCall({
                      operationId: getVersionsOperationId,
                      pathParams: {
                        id: updatedCreatedResource.data.id,
                      },
                      validateOutput: true,
                    }).then(fetchedVersions => {
                      expect(fetchedVersions).toBeTruthy()
                      expect(fetchedVersions.data).toBeTruthy()
                      expect(fetchedVersions.data.length === 2).toBeTruthy()
                      const firstVersionId = fetchedVersions.data[0].id
                      if (!getVersionOperationId) {
                        return null
                      }

                      return makeTestCall({
                        operationId: getVersionOperationId,
                        pathParams: {
                          id: updatedCreatedResource.data.id,
                          versionId: firstVersionId,
                        },
                        validateOutput: true,
                      }).then(fetchedVersion => {
                        expect(fetchedVersion).toBeTruthy()
                        expect(fetchedVersion.data).toBeTruthy()
                        expect(fetchedVersion.data.id).toBe(firstVersionId)
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    }
  })
}

const testMockGetMany = operationId => {
  describe(`Mock - ${operationId}`, () => {
    it('Works with mock data', () => {
      return makeTestCall({
        operationId,
        queryParams: {
          mock: true,
        },
        validateOutput: false,
      }).then(createdResource => {
        expect(createdResource).toBeTruthy()
        expect(createdResource.data).toBeTruthy()
        expect(createdResource.data.length).toBeTruthy()
      })
    })
  })
}

const testMockGetOne = operationId => {
  describe(`Mock - ${operationId}`, () => {
    it('Works with mock data', () => {
      return makeTestCall({
        operationId,
        pathParams: {
          id: 1,
        },
        queryParams: {
          mock: true,
        },
        validateOutput: false,
      }).then(createdResource => {
        expect(createdResource).toBeTruthy()
        expect(createdResource.data).toBeTruthy()
      })
    })
  })
}

const testCreate = ({ createOperationId, operations }) => {
  describe(`Create - ${createOperationId}`, () => {
    const { examples } = operations[createOperationId].request

    it('Has examples', () => {
      expect(examples).toBeTruthy()
      expect(Object.keys(examples).length).toBeTruthy()
    })

    Object.keys(examples).forEach(exampleKey => {
      const example = examples[exampleKey]
      it(`Works with example: ${exampleKey}`, () => {
        return makeTestCall({
          body: example,
          operationId: createOperationId,
          validateOutput: true,
        }).then(createdResource => {
          expect(createdResource).toBeTruthy()
          expect(createdResource.data).toBeTruthy()
        })
      })
    })
  })
}

const getOperationTypeIdMap = (operations = {}) => {
  return Object.keys(operations).reduce((map, operationId) => {
    const { type } = operations[operationId]
    return {
      ...map,
      [type]: operationId,
    }
  }, {})
}

const testApiResource = ({ resource, resourceName }) => {
  describe(`Resource - ${resourceName}`, () => {
    const { operations } = resource
    const operationTypeOperationIdMap = getOperationTypeIdMap(operations)
    const {
      create: createOperationId,
      getMany: getManyOperationId,
      getOne: getOneOperationId,
      getVersion: getVersionOperationId,
      getVersions: getVersionsOperationId,
      update: updateOperationId,
    } = operationTypeOperationIdMap

    if (createOperationId) {
      testCreate({
        createOperationId,
        operations,
      })
    }

    if (getManyOperationId) {
      testMockGetMany(getManyOperationId)
    }

    if (getOneOperationId) {
      testMockGetOne(getOneOperationId)
    }

    if (
      createOperationId &&
      getManyOperationId &&
      getOneOperationId &&
      updateOperationId
    ) {
      testCrudFlow({
        createOperationId,
        getManyOperationId,
        getOneOperationId,
        getVersionOperationId,
        getVersionsOperationId,
        operations,
        updateOperationId,
      })
    }
  })
}

const testApi = ({ service, serviceName }) => {
  describe(`Api - ${serviceName}`, () => {
    it('Run tests', () => {
      expect(1).toBe(1)
    })

    // const operationTypeOperationIdMap = createOperationTypeResourceOperationIdMap(
    //   service
    // )
    const { resources } = service
    Object.keys(resources).forEach(resourceName => {
      const resource = resources[resourceName]
      testApiResource({
        resource,
        resourceName,
      })
    })
  })
}

apiDescribe('defaultRequests', () => {
  beforeAll(() => {
    return waitForApiRestart()
  })

  it('Runs defaultRequests tests', () => {
    expect(1).toBe(1)
  })

  Object.keys(services).forEach(serviceName => {
    const service = services[serviceName]
    testApi({ service, serviceName })
  })
})
