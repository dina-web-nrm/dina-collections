import createEndpoint from 'utilities/endpointFactory/client'
import { immutableReplace } from 'utilities/stateHelper'

export const LOG_IN = createEndpoint({
  mapResponse: res => {
    return immutableReplace(res, {
      newPath: 'json.accessToken',
      oldPath: 'json.access_token',
    })
  },
  methodName: 'formPost',
  operationId: 'loginUser',
})

export const GET_USER = createEndpoint({
  mapResponse: res => {
    return immutableReplace(res, {
      newPath: 'json.username',
      oldPath: 'json.preferred_username',
    })
  },
  operationId: 'getUser',
  pathname: '/auth/realms/dina/protocol/openid-connect/userinfo',
})
