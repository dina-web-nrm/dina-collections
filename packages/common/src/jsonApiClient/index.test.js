const { createJsonApiClient, dep } = require('./index')

describe('jsonApiClient', () => {
  it('exports function', () => {
    expect(typeof createJsonApiClient).toEqual('function')
  })
  it('returns object with expected keys as functions', () => {
    const jsonApiClient = createJsonApiClient({
      apiConfigInput: {},
      createEndpoint: () => ({}),
    })

    expect(Object.keys(jsonApiClient).sort()).toEqual([
      'call',
      'create',
      'del',
      'downloadFile',
      'formPost',
      'getMany',
      'getOne',
      'httpDelete',
      'httpGet',
      'httpPatch',
      'httpPost',
      'httpPut',
      'update',
    ])
    Object.values(jsonApiClient).forEach(val => {
      expect(typeof val).toEqual('function')
    })
  })

  describe('with dependor', () => {
    let depSpies
    let openApiClient
    beforeEach(() => {
      openApiClient = {
        call: jest.fn((...args) => args),
      }
      depSpies = dep.createSpies({
        createOpenApiClient: jest.fn(() => {
          return openApiClient
        }),
      })
    })
    afterAll(() => {
      dep.reset()
    })

    it('calls createOpenApiClient', () => {
      const input = { apiConfigInput: {}, createEndpoint: () => {} }

      createJsonApiClient(input)

      expect(depSpies.createOpenApiClient).toHaveBeenCalled()
      expect(depSpies.createOpenApiClient).toHaveBeenCalledWith(input)
    })

    it('calls openApiClient.call', () => {
      const input = { apiConfigInput: {}, createEndpoint: () => {} }
      const jsonApiClient = createJsonApiClient(input)

      jsonApiClient.call('placeGetOne')

      expect(openApiClient.call).toHaveBeenCalled()
      expect(openApiClient.call).toHaveBeenCalledWith('placeGetOne')
    })

    it('calls jsonApiUpdate with resourcesToModify based on resourceType', () => {
      const input = { apiConfigInput: {}, createEndpoint: () => {} }
      const jsonApiClient = createJsonApiClient(input)

      jsonApiClient.update('agent', {
        body: {
          data: {
            id: '1',
          },
        },
      })

      expect(depSpies.jsonApiUpdate).toHaveBeenCalled()
      expect(depSpies.jsonApiUpdate).toHaveBeenCalledWith({
        item: { id: '1' },
        openApiClient,
        resourcesToModify: [],
        resourceType: 'agent',
      })
    })

    it('calls jsonApiCreate with custom resourcesToModify', () => {
      const input = { apiConfigInput: {}, createEndpoint: () => {} }
      const jsonApiClient = createJsonApiClient(input)

      jsonApiClient.create('agent', {
        body: {
          data: {
            age: 30,
          },
        },
        resourcesToModify: ['agent', 'user'],
      })

      expect(depSpies.jsonApiCreate).toHaveBeenCalled()
      expect(depSpies.jsonApiCreate).toHaveBeenCalledWith({
        item: { age: 30 },
        openApiClient,
        resourcesToModify: ['agent', 'user'],
        resourceType: 'agent',
      })
    })

    it('calls jsonApiCreate with custom resourcesToModify', () => {
      const input = { apiConfigInput: {}, createEndpoint: () => {} }
      const jsonApiClient = createJsonApiClient(input)

      jsonApiClient.create('agent', {
        body: {
          data: {
            age: 30,
          },
        },
        resourcesToModify: ['agent', 'user'],
      })

      expect(depSpies.jsonApiCreate).toHaveBeenCalled()
      expect(depSpies.jsonApiCreate).toHaveBeenCalledWith({
        item: { age: 30 },
        openApiClient,
        resourcesToModify: ['agent', 'user'],
        resourceType: 'agent',
      })
    })

    it('calls jsonApiGetOne', () => {
      const input = { apiConfigInput: {}, createEndpoint: () => {} }
      const jsonApiClient = createJsonApiClient(input)

      jsonApiClient.getOne('agent', {
        queryParams: {
          filter: {
            age: 30,
          },
        },
      })

      expect(depSpies.jsonApiGetOne).toHaveBeenCalled()
      expect(depSpies.jsonApiGetOne).toHaveBeenCalledWith({
        openApiClient,
        resourceType: 'agent',
        userOptions: {
          queryParams: {
            filter: {
              age: 30,
            },
          },
        },
      })
    })

    it('calls jsonApiGetMany', () => {
      const input = { apiConfigInput: {}, createEndpoint: () => {} }
      const jsonApiClient = createJsonApiClient(input)

      jsonApiClient.getMany('agent', {
        queryParams: {
          limit: 10,
        },
      })

      expect(depSpies.jsonApiGetMany).toHaveBeenCalled()
      expect(depSpies.jsonApiGetMany).toHaveBeenCalledWith({
        openApiClient,
        resourceType: 'agent',
        userOptions: {
          queryParams: {
            limit: 10,
          },
        },
      })
    })
  })
})
