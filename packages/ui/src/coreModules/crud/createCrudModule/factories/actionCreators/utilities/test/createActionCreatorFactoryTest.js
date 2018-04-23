export default function createActionCreatorFactoryTest({
  actionCreatorFactory,
  actionCreatorFactoryInput,
  dep,
  expectedGetActionActionTypesInput,
}) {
  it('all required arguments provided to test function', () => {
    expect(actionCreatorFactory).toBeTruthy()
    expect(actionCreatorFactoryInput).toBeTruthy()
    expect(dep).toBeTruthy()
    expect(expectedGetActionActionTypesInput).toBeTruthy()
  })
  it('is a function', () => {
    expect.assertions(1)
    expect(typeof actionCreatorFactory).toBe('function')
  })
  it('creates a function', () => {
    expect.assertions(1)
    const actionCreator = actionCreatorFactory(actionCreatorFactoryInput)
    expect(typeof actionCreator).toBe('function')
  })
  it('throws an error if operationId is missing', () => {
    expect.assertions(1)

    const clonedInput = JSON.parse(JSON.stringify(actionCreatorFactoryInput))
    delete clonedInput.operationId
    expect(() => {
      actionCreatorFactory(clonedInput)
    }).toThrow()
  })

  describe('with dependor', () => {
    let getActionActionTypesMock
    beforeEach(() => {
      getActionActionTypesMock = jest.fn()
      dep.freeze()
      dep.mock({
        getActionActionTypes: input => {
          getActionActionTypesMock(input)
          return input
        },
      })
    })
    afterAll(() => {
      dep.reset()
    })

    it('calls getActionActionTypes', () => {
      expect.assertions(1)
      actionCreatorFactory({
        operationId: 'createPhysicalObject',
        resource: 'physicalObject',
      })
      expect(getActionActionTypesMock.mock.calls.length).toEqual(1)
    })

    it('calls getActionActionTypes with expected arguments', () => {
      expect.assertions(1)
      actionCreatorFactory(actionCreatorFactoryInput)
      expect(getActionActionTypesMock.mock.calls[0][0]).toEqual(
        expectedGetActionActionTypesInput
      )
    })
  })
}
