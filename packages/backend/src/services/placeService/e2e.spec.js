const {
  describe: apiDescribe,
  hook,
} = require('common/src/testUtilities/envBackendApi')
const { makeTestCall } = require('../../utilities/test/testApiClient')
const waitForApiRestart = require('../../utilities/test/waitForApiRestart')

const simplePlaceParent = {
  data: {
    attributes: {
      name: 'europe',
    },
    type: 'place',
  },
}

const simplePlace = {
  data: {
    attributes: {
      name: 'sweden',
    },
    type: 'place',
  },
}

const simplePlaceChild = {
  data: {
    attributes: {
      name: 'ronneby',
    },
    type: 'place',
  },
}

const simplePlaceUpdate = {
  data: {
    attributes: {
      description: 'country',
      name: 'sweden',
    },
    type: 'place',
  },
}

it('Runs place tests', () => {
  expect(1).toBe(1)
})

apiDescribe('place', () => {
  let authToken
  hook(beforeAll, () => {
    return waitForApiRestart().then(() => {
      authToken = 1234
    })
  })

  it('Runs place tests', () => {
    expect(!!authToken).toBeTruthy()
    expect(1).toBe(1)
  })

  describe('createPlace', () => {
    it('Succeed with simpleCase', () => {
      return makeTestCall({
        authToken,
        body: simplePlace,
        operationId: 'placeCreate',
      }).then(res => {
        expect(res).toBeTruthy()
      })
    })
  })
  describe('getPlace', () => {
    let id
    hook(beforeEach, () => {
      return makeTestCall({
        authToken,
        body: simplePlace,
        operationId: 'placeCreate',
      }).then(res => {
        expect(res).toBeTruthy()
        id = res.data.id // eslint-disable-line prefer-destructuring
      })
    })
    it('Works with simple get', () => {
      return makeTestCall({
        authToken,
        operationId: 'placeGetOne',
        pathParams: {
          id,
        },
      }).then(res => {
        expect(res).toBeTruthy()
      })
    })
  })
  describe('updatePlace', () => {
    let id
    hook(beforeEach, () => {
      return makeTestCall({
        authToken,
        body: simplePlace,
        operationId: 'placeCreate',
      }).then(res => {
        expect(res).toBeTruthy()
        id = res.data.id // eslint-disable-line prefer-destructuring
      })
    })
    it('Works with simple get', () => {
      return makeTestCall({
        authToken,
        body: simplePlaceUpdate,
        operationId: 'placeUpdate',
        pathParams: {
          id,
        },
      }).then(res => {
        expect(res).toBeTruthy()
        return makeTestCall({
          authToken,
          body: simplePlaceUpdate,
          operationId: 'placeUpdate',
          pathParams: {
            id,
          },
        }).then(res2 => {
          expect(res2).toBeTruthy()
        })
      })
    })
  })
  describe('tmp flow', () => {
    let parentId
    let childId
    let grandchildId
    it('works', () => {
      return makeTestCall({
        authToken,
        body: simplePlaceParent,
        operationId: 'placeCreate',
      })
        .then(res => {
          expect(res).toBeTruthy()
          parentId = res.data.id // eslint-disable-line prefer-destructuring
        })
        .then(() => {
          return makeTestCall({
            authToken,
            body: simplePlace,
            operationId: 'placeCreate',
          }).then(res => {
            childId = res.data.id // eslint-disable-line prefer-destructuring
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            body: simplePlaceChild,
            operationId: 'placeCreate',
          }).then(res => {
            grandchildId = res.data.id // eslint-disable-line prefer-destructuring
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            body: {
              data: {
                id: parentId,
                type: 'place',
              },
            },
            operationId: 'placeUpdateRelationshipParent',
            pathParams: {
              id: childId,
            },
          }).then(() => {
            expect(parentId).toBeTruthy()
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            body: {
              data: {
                id: childId,
                type: 'place',
              },
            },
            operationId: 'placeUpdateRelationshipParent',
            pathParams: {
              id: grandchildId,
            },
          }).then(() => {
            expect(parentId).toBeTruthy()
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            operationId: 'placeGetOne',
            pathParams: {
              id: childId,
            },
            queryParams: {
              relationships: ['all'],
            },
          }).then(res => {
            expect(res.data.relationships.parent.data.id).toBe(parentId)
          })
        })
    })
  })
})
