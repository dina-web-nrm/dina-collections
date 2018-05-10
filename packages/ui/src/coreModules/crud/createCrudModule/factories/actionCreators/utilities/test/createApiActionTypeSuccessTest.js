import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

export default function createActionTypeRequestSuccess({
  actionCreatorFactory,
  actionCreatorFactoryInput,
  actionCreatorInput,
  expectedAction,
  expectedActionType,
  mockResponse,
}) {
  it('all required arguments provided to test function', () => {
    expect(actionCreatorFactory).toBeTruthy()
    expect(actionCreatorFactoryInput).toBeTruthy()
    expect(actionCreatorInput).toBeTruthy()
    expect(expectedAction).toBeTruthy()
    expect(expectedActionType).toBeTruthy()
    expect(mockResponse).toBeTruthy()
  })
  const { resource, operationType } = actionCreatorFactoryInput
  let actionCreator
  let store
  let apiClient
  beforeEach(() => {
    const mock = setupMockStoreWithApiClient()
    /* eslint-disable prefer-destructuring */
    store = mock.store
    apiClient = mock.apiClientDependencies
    /* eslint-enable prefer-destructuring */
    actionCreator = actionCreatorFactory(actionCreatorFactoryInput)

    apiClient.mock({
      responses: {
        [resource]: {
          [operationType]: mockResponse,
        },
      },
    })
  })
  it(`dispatched when actionCreator called`, () => {
    expect.assertions(3)
    const testAction = actionCreator(actionCreatorInput)
    return store.dispatch(testAction).then(() => {
      expect(store.getActions().length).toBe(2)
      expect(store.getActions()[1].type).toEqual(expectedActionType)
      expect(store.getActions()[1]).toEqual(expectedAction)
    })
  })
}
