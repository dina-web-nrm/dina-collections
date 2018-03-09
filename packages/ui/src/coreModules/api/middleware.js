import globalUserSelectors from 'coreModules/user/globalSelectors'
import createSystemFrontendValidator from 'common/es5/error/validators/createSystemFrontendValidator'
import { createApiClient } from 'common/es5/apiClient'

export const buildAuthHeaders = state => {
  const authToken = globalUserSelectors.getAuthToken(state)
  if (!authToken) {
    return {}
  }
  return { Authorization: `bearer ${authToken}` }
}

export default function createApiMiddleware(apiClientOptions) {
  const systemValidate = (input, schema) => {
    const validator = createSystemFrontendValidator({
      schema,
      type: 'config',
    })
    return validator(input)
  }
  return ({ dispatch, getState }) => {
    const apiClient = createApiClient({
      ...apiClientOptions,
      mapHeaders: headers => {
        return {
          ...headers,
          ...buildAuthHeaders(getState()),
        }
      },
      systemValidate,
    })
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState, {
          apiClient,
        })
      }
      return next(action)
    }
  }
}
