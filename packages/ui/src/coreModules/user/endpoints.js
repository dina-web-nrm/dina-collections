import createEndpoint from 'utilities/endpointFactory/client'
import { immutableReplace } from 'utilities/stateHelper'

export const LOG_IN = createEndpoint({
  mapResponse: res => {
    return immutableReplace(res, {
      newPath: 'accessToken',
      oldPath: 'access_token',
    })
  },
  methodName: 'formPost',
  operationId: 'loginUser',
})

export const GET_USER = createEndpoint({
  mapResponse: res => {
    return immutableReplace(res, {
      newPath: 'username',
      oldPath: 'preferred_username',
    })
  },
  operationId: 'getUser',
  pathname: '/auth/realms/dina/protocol/openid-connect/userinfo',
})
