module.exports = function intercept({
  apiConfig,
  endpointConfig,
  methodConfig,
  request,
}) {
  return Promise.resolve().then(() => {
    const { cache, enableEndpointMocks } = apiConfig
    const { mock: endpointMock, getExample } = endpointConfig
    const {
      queryParams: { mock: mockRequested, exampleId: requestedExampleId },
    } = request
    if (mockRequested === true && endpointMock) {
      if (requestedExampleId && getExample) {
        return getExample(requestedExampleId).then(example => {
          if (!example) {
            const error = new Error(
              `Example with key: ${requestedExampleId} not found`
            )
            error.status = 404
            throw error
          }
          return example
        })
      }
      return endpointMock({
        apiConfig,
        endpointConfig,
        methodConfig,
        request,
      }).then(mockData => {
        if (!mockData.data) {
          return mockData
        }
        /* eslint-disable no-param-reassign */
        if (Array.isArray(mockData.data)) {
          const items = mockData.data.map(item => {
            if (item.attributes && item.attributes.id) {
              delete item.attributes.id
            }
            return item
          })
          return {
            ...mockData,
            data: items,
          }
        }
        if (
          mockData.data &&
          mockData.data.attributes &&
          mockData.data.attributes.id
        ) {
          delete mockData.data.attributes.id
        }
        return mockData

        /* eslint-enable no-param-reassign */
      })
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
        return mockResult
      })
    }

    if (cache) {
      return null
    }

    return null
  })
}
