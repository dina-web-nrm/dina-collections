const { login, makeTestCall } = require('../utilities')

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

// const UNEXPECTED_SUCCESS = 'Call successfull but should have failed'

describe('curatedLocality', () => {
  let authToken
  beforeEach(() => {
    return login().then(loginToken => {
      authToken = loginToken
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
        id = res.data.id
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
        id = res.data.id
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
