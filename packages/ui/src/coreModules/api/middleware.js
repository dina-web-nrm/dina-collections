import globalUserSelectors from 'coreModules/user/globalSelectors'
import createSystemFrontendValidator from 'common/es5/error/validators/createSystemFrontendValidator'
import { createJsonApiClient } from 'common/es5/jsonApiClient'
import createEndpoint from 'utilities/endpointFactory/client'

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
    const apiConfigInput = {
      ...apiClientOptions,
      mapHeaders: headers => {
        return {
          ...headers,
          ...buildAuthHeaders(getState()),
        }
      },
      systemValidate,
    }

    const apiClient = createJsonApiClient({
      apiConfigInput,
      createEndpoint,
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
