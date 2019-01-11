const createOpenApiMockClient = require('../../../openApiClient/utilities/createOpenApiMockClient')
const { update, dep } = require('./index')

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
      })
    ).rejects.toThrow('provide openApiClient')
  })

  it('rejects if item not provided', () => {
    expect.assertions(1)
    return expect(
      update({
        openApiClient: {},
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
      })
    ).rejects.toThrow('id is required')
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
