const apiDescribe = require('../../../utilities/test/apiDescribe')
const { makeTestCall } = require('../../../utilities/test/testApiClient')

const simpleCuratedLocality = {
  data: {
    attributes: {
      name: 'sweden',
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
  beforeEach(() => {
    authToken = 1234
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
})
