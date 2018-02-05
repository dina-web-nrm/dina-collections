import createEndpoint from 'utilities/endpointFactory/client'

export const LOG_IN = createEndpoint({
  mapResponse: json => {
    return {
      accessToken: json.access_token,
    }
  },
  methodName: 'formPost',
  operationId: 'loginUser',
})

export const GET_USER = createEndpoint({
  mapResponse: json => {
    return {
      email: json.email,
      username: json.preferred_username,
    }
  },
  operationId: 'getUser',
  pathname: '/auth/realms/dina/protocol/openid-connect/userinfo',
})
