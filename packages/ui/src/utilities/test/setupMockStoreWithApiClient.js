import configureStore from 'redux-mock-store'

import mockApiClient, { dep as apiClientDependencies } from './mockApiClient'
import createMockApiMiddleware from './createMockApiMiddleware'

export default function setupMockStoreWithApiClient() {
  const apiMiddleware = createMockApiMiddleware(mockApiClient)
  const middlewares = [apiMiddleware]
  const store = configureStore(middlewares)()

  apiClientDependencies.reset()

  return {
    apiClientDependencies,
    store,
  }
}
