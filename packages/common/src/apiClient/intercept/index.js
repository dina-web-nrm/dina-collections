module.exports = function intercept({
  apiConfig,
  endpointConfig,
  methodConfig,
  request,
}) {
  return Promise.resolve().then(() => {
    const { mock: apiMock, cache, enableEndpointMocks } = apiConfig
    const { mock: endpointMock } = endpointConfig

    if (apiMock) {
      const mockResult = apiMock({
        apiConfig,
        endpointConfig,
        methodConfig,
        request,
      })
      if (mockResult) {
        return { json: mockResult }
      }
    }

    if (enableEndpointMocks && endpointMock) {
      return Promise.resolve(
        endpointMock({
          apiConfig,
          endpointConfig,
          methodConfig,
          request,
        })
      ).then(mockResult => {
        return { json: mockResult }
      })
    }

    if (cache) {
      return null
    }

    return null
  })
}
