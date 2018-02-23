const apiDescribe = require('../../utilities/test/apiDescribe')
const { makeTestCall } = require('../../utilities/test/testApiClient')
const waitForApiRestart = require('../../utilities/test/waitForApiRestart')
const apis = require('../../apis')
const createOperationTypeResourceOperationIdMap = require('./createOperationTypeResourceOperationIdMap')

const testCrudFlow = ({
  createOperationId,
  endpoints,
  getManyOperationId,
  getOneOperationId,
  updateOperationId,
}) => {
  const testing = [
    createOperationId,
    getOneOperationId,
    getManyOperationId,
    updateOperationId,
  ]
    .filter(operationId => !!operationId)
    .join(', ')

  describe(`Crud flow with ${testing}`, () => {
    const { examples } = endpoints[createOperationId].request
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

const testCreate = ({ createOperationId, endpoints }) => {
  describe(`Create - ${createOperationId}`, () => {
    const { examples } = endpoints[createOperationId].request

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

const testApiResource = ({
  endpoints,
  operationTypeOperationIdMap,
  resource,
}) => {
  describe(`Resource - ${resource}`, () => {
    const {
      create: createOperationId,
      getMany: getManyOperationId,
      getOne: getOneOperationId,
      update: updateOperationId,
    } = operationTypeOperationIdMap[resource]

    if (createOperationId) {
      testCreate({
        createOperationId,
        endpoints,
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
        endpoints,
        getManyOperationId,
        getOneOperationId,
        updateOperationId,
      })
    }
  })
}

const testApi = ({ api, apiName }) => {
  describe(`Api - ${apiName}`, () => {
    it('Run tests', () => {
      expect(1).toBe(1)
    })
    const operationTypeOperationIdMap = createOperationTypeResourceOperationIdMap(
      api
    )
    const { endpoints } = api
    Object.keys(operationTypeOperationIdMap).forEach(resource => {
      testApiResource({
        endpoints,
        operationTypeOperationIdMap,
        resource,
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

  Object.keys(apis).forEach(apiName => {
    const api = apis[apiName]
    testApi({ api, apiName })
  })
})
