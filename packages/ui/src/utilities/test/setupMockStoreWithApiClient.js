import configureStore from 'redux-mock-store'

import createMockApiClient from './createMockApiClient'
import createMockApiMiddleware from './createMockApiMiddleware'

export default function setupMockStoreWithApiClient() {
  const { apiClientDependencies, mockApiClient } = createMockApiClient()
  const apiMiddleware = createMockApiMiddleware(mockApiClient)
  const middlewares = [apiMiddleware]
  const store = configureStore(middlewares)()

  apiClientDependencies.reset()

  return {
    apiClientDependencies,
    store,
  }
}
