import globalUserSelectors from 'coreModules/user/globalSelectors'
import { createSystemSchemaValidator } from 'utilities/error'
import createApiClient from 'utilities/apiClient'

export const buildAuthHeaders = state => {
  const authToken = globalUserSelectors.getAuthToken(state)
  if (!authToken) {
    return {}
  }
  return { Authorization: `bearer ${authToken}` }
}

export default function createApiMiddleware(apiClientOptions) {
  const systemValidate = (input, schema) => {
    const validator = createSystemSchemaValidator(schema)
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
      mapResponse: ({ json }) => json,
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
