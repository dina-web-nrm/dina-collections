module.exports = function intercept({
  apiConfig,
  endpointConfig,
  methodConfig,
  request,
}) {
  return Promise.resolve().then(() => {
    const { cache, enableEndpointMocks } = apiConfig
    const { mock: endpointMock } = endpointConfig

    if (enableEndpointMocks && endpointMock) {
      return Promise.resolve(
        endpointMock({
          apiConfig,
          endpointConfig,
          methodConfig,
          request,
        })
      ).then(mockResult => {
        return mockResult
      })
    }

    if (cache) {
      return null
    }

    return null
  })
}
