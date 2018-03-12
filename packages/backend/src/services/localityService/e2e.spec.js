const apiDescribe = require('../../utilities/test/apiDescribe')
const { makeTestCall } = require('../../utilities/test/testApiClient')
const waitForApiRestart = require('../../utilities/test/waitForApiRestart')

const simpleCuratedLocalityParent = {
  data: {
    attributes: {
      name: 'europe',
    },
    type: 'curatedLocality',
  },
}

const simpleCuratedLocality = {
  data: {
    attributes: {
      name: 'sweden',
    },
    type: 'curatedLocality',
  },
}

const simpleCuratedLocalityChild = {
  data: {
    attributes: {
      name: 'ronneby',
    },
    type: 'curatedLocality',
  },
}

const simpleCuratedLocalityUpdate = {
  data: {
    attributes: {
      description: 'country',
      name: 'sweden',
    },
    type: 'curatedLocality',
  },
}

it('Runs curatedLocality tests', () => {
  expect(1).toBe(1)
})

apiDescribe('curatedLocality', () => {
  let authToken
  beforeAll(() => {
    return waitForApiRestart().then(() => {
      authToken = 1234
    })
  })

  it('Runs curatedLocality tests', () => {
    expect(!!authToken).toBeTruthy()
    expect(1).toBe(1)
  })

  describe('createCuratedLocality', () => {
    it('Succeed with simpleCase', () => {
      return makeTestCall({
        authToken,
        body: simpleCuratedLocality,
        operationId: 'createCuratedLocality',
      }).then(res => {
        expect(res).toBeTruthy()
      })
    })
  })
  describe('getCuratedLocality', () => {
    let id
    beforeEach(() => {
      return makeTestCall({
        authToken,
        body: simpleCuratedLocality,
        operationId: 'createCuratedLocality',
      }).then(res => {
        expect(res).toBeTruthy()
        id = res.data.id // eslint-disable-line prefer-destructuring
      })
    })
    it('Works with simple get', () => {
      return makeTestCall({
        authToken,
        operationId: 'getCuratedLocality',
        pathParams: {
          id,
        },
      }).then(res => {
        expect(res).toBeTruthy()
      })
    })
  })
  describe('updateCuratedLocality', () => {
    let id
    beforeEach(() => {
      return makeTestCall({
        authToken,
        body: simpleCuratedLocality,
        operationId: 'createCuratedLocality',
      }).then(res => {
        expect(res).toBeTruthy()
        id = res.data.id // eslint-disable-line prefer-destructuring
      })
    })
    it('Works with simple get', () => {
      return makeTestCall({
        authToken,
        body: simpleCuratedLocalityUpdate,
        operationId: 'updateCuratedLocality',
        pathParams: {
          id,
        },
      }).then(res => {
        expect(res).toBeTruthy()
        return makeTestCall({
          authToken,
          body: simpleCuratedLocalityUpdate,
          operationId: 'updateCuratedLocality',
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
        body: simpleCuratedLocalityParent,
        operationId: 'createCuratedLocality',
      })
        .then(res => {
          expect(res).toBeTruthy()
          parentId = res.data.id // eslint-disable-line prefer-destructuring
        })
        .then(() => {
          return makeTestCall({
            authToken,
            body: simpleCuratedLocality,
            operationId: 'createCuratedLocality',
          }).then(res => {
            childId = res.data.id // eslint-disable-line prefer-destructuring
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            body: simpleCuratedLocalityChild,
            operationId: 'createCuratedLocality',
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
                type: 'curatedLocality',
              },
            },
            operationId: 'updateCuratedLocalityParent',
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
                type: 'curatedLocality',
              },
            },
            operationId: 'updateCuratedLocalityParent',
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
            operationId: 'getCuratedLocality',
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
