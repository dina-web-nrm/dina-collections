import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

export default function createApiActionTypeRequestTest({
  actionCreatorFactory,
  actionCreatorFactoryInput,
  actionCreatorInput,
  expectedAction,
  expectedActionType,
}) {
  it('all required arguments provided to test function', () => {
    expect(actionCreatorFactory).toBeTruthy()
    expect(actionCreatorFactoryInput).toBeTruthy()
    expect(actionCreatorInput).toBeTruthy()
    expect(expectedAction).toBeTruthy()
    expect(expectedActionType).toBeTruthy()
  })

  let actionCreator
  let store
  beforeEach(() => {
    const mock = setupMockStoreWithApiClient()
    /* eslint-disable prefer-destructuring */
    store = mock.store
    /* eslint-enable prefer-destructuring */

    actionCreator = actionCreatorFactory(actionCreatorFactoryInput)
  })
  it(`dispatched when actionCreator called`, () => {
    expect.assertions(3)
    const testAction = actionCreator(actionCreatorInput)
    store.dispatch(testAction)
    expect(store.getActions().length).toEqual(1)
    expect(store.getActions()[0].type).toEqual(expectedActionType)
    expect(store.getActions()[0]).toEqual(expectedAction)
  })
}
