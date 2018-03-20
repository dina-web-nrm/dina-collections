export default function createMockApiMiddleware(mockApiClient) {
  return ({ dispatch, getState }) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState, {
          apiClient: mockApiClient,
        })
      }

      return next(action)
    }
  }
}
