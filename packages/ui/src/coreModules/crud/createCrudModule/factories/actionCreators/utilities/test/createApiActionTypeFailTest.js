import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

export default function createApiActionTypeFailTest({
  actionCreatorFactory,
  actionCreatorFactoryInput,
  actionCreatorInput,
  expectedAction,
  expectedActionType,
  mockError,
}) {
  it('all required arguments provided to test function', () => {
    expect(actionCreatorFactory).toBeTruthy()
    expect(actionCreatorFactoryInput).toBeTruthy()
    expect(actionCreatorInput).toBeTruthy()
    expect(expectedAction).toBeTruthy()
    expect(expectedActionType).toBeTruthy()
    expect(mockError).toBeTruthy()
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
      errors: {
        [resource]: {
          [operationType]: mockError,
        },
      },
    })
  })
  it(`dispatched when actionCreator call failed. throw when throwError = true`, () => {
    const clonedActionCreatorInput = JSON.parse(
      JSON.stringify(actionCreatorInput)
    )
    clonedActionCreatorInput.throwError = true
    const testAction = actionCreator(clonedActionCreatorInput)
    return store.dispatch(testAction).catch(err => {
      expect(store.getActions().length).toBe(2)
      expect(store.getActions()[1].type).toEqual(expectedActionType)
      expect(store.getActions()[1]).toEqual(expectedAction)
      expect(err).toEqual(mockError)
    })
  })

  it(`dispatched when actionCreator call failed. dont throw when throwError = false`, () => {
    const clonedActionCreatorInput = JSON.parse(
      JSON.stringify(actionCreatorInput)
    )
    clonedActionCreatorInput.throwError = false
    const testAction = actionCreator(clonedActionCreatorInput)
    return store.dispatch(testAction).then(err => {
      expect(store.getActions().length).toBe(2)
      expect(store.getActions()[1].type).toEqual(expectedActionType)
      expect(store.getActions()[1]).toEqual(expectedAction)
      expect(err).toEqual(mockError)
    })
  })
}
