import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

export default function createApiClientTest({
  actionCreatorFactory,
  actionCreatorFactoryInput,
  actionCreatorInput,
  expectedApiClientCallParams,
  mockResponse,
}) {
  it('all required arguments provided to test function', () => {
    expect(actionCreatorFactory).toBeTruthy()
    expect(actionCreatorFactoryInput).toBeTruthy()
    expect(actionCreatorInput).toBeTruthy()
    expect(expectedApiClientCallParams).toBeTruthy()
    expect(mockResponse).toBeTruthy()
  })
  const { operationId } = actionCreatorFactoryInput
  let callSpy
  let actionCreator
  let store
  let apiClient
  beforeEach(() => {
    const mock = setupMockStoreWithApiClient()
    /* eslint-disable prefer-destructuring */
    store = mock.store
    apiClient = mock.apiClientDependencies
    /* eslint-enable prefer-destructuring */

    callSpy = jest.fn()
    apiClient.mock({
      responses: {
        [operationId]: mockResponse,
      },
      spies: {
        [operationId]: callSpy,
      },
    })
    actionCreator = actionCreatorFactory(actionCreatorFactoryInput)
  })
  afterAll(() => {
    apiClient.reset()
  })

  it(`called with expected input`, () => {
    expect.assertions(3)

    const testAction = actionCreator(actionCreatorInput)

    return store.dispatch(testAction).then(() => {
      expect(callSpy.mock.calls.length).toEqual(1)
      expect(callSpy.mock.calls[0][0]).toEqual(operationId)
      expect(callSpy.mock.calls[0][1]).toEqual(expectedApiClientCallParams)
    })
  })
}
