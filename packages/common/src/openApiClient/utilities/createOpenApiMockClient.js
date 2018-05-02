module.exports = function createOpenApiMockClient(hooks = {}) {
  const spies = {
    call: jest.fn(),
  }

  const call = (operationId, userInput) => {
    spies.call(operationId, userInput)
    const callHook = hooks.call
    return Promise.resolve().then(() => {
      if (callHook) {
        return callHook(operationId, userInput)
      }
      return {
        operationId,
        userInput,
      }
    })
  }

  return {
    call,
    spies,
  }
}
