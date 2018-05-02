const { create, dep } = require('./create')

describe('jsonApiClient/create/create', () => {
  it('is a function', () => {
    expect(typeof create).toEqual('function')
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
      create({ openApiClient, resourceType, userOptions })
      expect(createWithRelationshipsMock.mock.calls.length).toEqual(1)
      expect(createWithRelationshipsMock.mock.calls[0][0]).toEqual({
        openApiClient: {},
        resource: {},
        resourceType: 'specimen',
      })
    })
  })
})
