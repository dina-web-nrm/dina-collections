const createOpenApiMockClient = require('../../openApiClient/utilities/createOpenApiMockClient')
const { update, dep } = require('./update')

describe('jsonApiClient/modify/update', () => {
  it('exports function update', () => {
    expect(typeof update).toEqual('function')
  })
  it('exports dep', () => {
    expect(typeof dep).toEqual('object')
  })

  it('rejects if openApiClient not provided', () => {
    expect.assertions(1)
    return expect(
      update({
        item: {
          id: '123',
          type: 'user',
        },
        resourcesToModify: ['user'],
      })
    ).rejects.toThrow('provide openApiClient')
  })

  it('rejects if item not provided', () => {
    expect.assertions(1)
    return expect(
      update({
        openApiClient: {},
        resourcesToModify: ['user'],
      })
    ).rejects.toThrow('item required')
  })

  it('rejects if type not provided in item', () => {
    expect.assertions(1)
    return expect(
      update({
        item: {
          attributes: {
            name: 'Alan',
          },
          id: '123',
        },
        openApiClient: {},
        resourcesToModify: ['user'],
      })
    ).rejects.toThrow('type is required')
  })

  it('rejects if item id not provided', () => {
    expect.assertions(1)
    return expect(
      update({
        item: {
          attributes: {
            name: 'Alan',
          },
          type: 'user',
        },
        openApiClient: {},
        resourcesToModify: ['user'],
      })
    ).rejects.toThrow('id is required')
  })
  it('rejects if attributes not provided', () => {
    expect.assertions(1)
    return expect(
      update({
        item: {
          id: 1,
          type: 'user',
        },
        openApiClient: {},
        resourcesToModify: ['user'],
      })
    ).rejects.toThrow('attributes are required')
  })

  it('rejects if resourcesToModify not provided', () => {
    expect.assertions(1)
    return expect(
      update({
        item: {
          attributes: {
            name: 'Alan',
          },
          id: 1,
          type: 'user',
        },
        openApiClient: {},
      })
    ).rejects.toThrow('resourcesToModify is required')
  })

  it('rejects if item.type not in resourcesToModify', () => {
    expect.assertions(1)
    return expect(
      update({
        item: {
          attributes: {
            name: 'Alan',
          },
          id: 1,
          type: 'user',
        },
        openApiClient: {},
        resourcesToModify: ['project'],
      })
    ).rejects.toThrow('resource: user is not included in [project]')
  })

  describe('with dependor', () => {
    let depSpies
    let openApiClient
    beforeEach(() => {
      depSpies = dep.createSpies({
        buildOperationId: () => {
          return 'operationId'
        },
      })
      openApiClient = createOpenApiMockClient({
        call: () => {
          return 'apiResponse'
        },
      })
    })

    it('call buildOperationId and openApiClient', () => {
      expect.assertions(6)
      const item = {
        attributes: {
          name: 'Alan',
        },
        id: '123',
        type: 'user',
      }
      return update({
        item,
        openApiClient,
        resourcesToModify: ['user'],
      }).then(res => {
        expect(depSpies.buildOperationId.mock.calls.length).toEqual(1)
        expect(depSpies.buildOperationId.mock.calls[0][0]).toEqual({
          operationType: 'update',
          resource: 'user',
        })
        expect(openApiClient.spies.call.mock.calls.length).toEqual(1)
        expect(openApiClient.spies.call.mock.calls[0][0]).toEqual('operationId')
        expect(openApiClient.spies.call.mock.calls[0][1]).toEqual({
          body: { data: item },
          pathParams: {
            id: item.id,
          },
        })

        expect(res).toBe('apiResponse')
      })
    })
  })
})
