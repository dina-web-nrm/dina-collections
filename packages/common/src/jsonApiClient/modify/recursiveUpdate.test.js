const { update, dep } = require('./update')

describe('jsonApiClient/update/update', () => {
  it('is a function', () => {
    expect(typeof update).toEqual('function')
  })
  it('exports dev', () => {
    expect(typeof dep).toEqual('object')
  })

  describe('with dependor', () => {
    let createWithRelationshipsMock
    beforeEach(() => {
      createWithRelationshipsMock = jest.fn()
      dep.freeze()
      dep.mock({
        createWithRelationships: (...args) => {
          createWithRelationshipsMock(...args)
        },
      })
    })
    afterAll(() => {
      dep.reset()
    })
    it('Call createWithRelationships with expected arguments', () => {
      const openApiClient = {}
      const resourceType = 'specimen'
      const userOptions = {
        body: {},
      }
      update({ openApiClient, resourceType, userOptions })
      expect(createWithRelationshipsMock.mock.calls.length).toEqual(1)
      expect(createWithRelationshipsMock.mock.calls[0][0]).toEqual({
        openApiClient: {},
        resource: {},
        resourceType: 'specimen',
      })
    })
    it('Add id to resource', () => {
      const openApiClient = {}
      const resourceType = 'specimen'
      const userOptions = {
        body: {
          attributes: {
            a: 2,
          },
        },
        pathParams: {
          id: 2,
        },
      }
      update({ openApiClient, resourceType, userOptions })
      expect(createWithRelationshipsMock.mock.calls.length).toEqual(1)
      expect(createWithRelationshipsMock.mock.calls[0][0]).toEqual({
        openApiClient: {},
        resource: { attributes: { a: 2 }, id: 2 },
        resourceType: 'specimen',
      })
    })
  })
})
