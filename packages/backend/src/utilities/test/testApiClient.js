require('isomorphic-fetch')

const jsonApiSchema = require('common/src/apiClient/schemas/jsonApi')
const createSystemFrontendValidator = require('common/src/error/validators/createSystemFrontendValidator')
const createEndpoint = require('common/src/endpointFactory/server')
const { createApiClient } = require('common/src/apiClient')

const config = require('../../apps/core/config')

const { testApiUrl, testAuthUrl, testUsername, testPassword } = config.test

const createAuthClient = ({ baseUrl = testAuthUrl } = {}) => {
  return createApiClient({
    baseUrl,
  })
}

exports.login = ({ password = testPassword, username = testUsername } = {}) => {
  const authClient = createAuthClient()
  return authClient
    .formPost(
      createEndpoint({
        mapResponse: json => {
          return {
            accessToken: json.access_token,
          }
        },
        operationId: 'loginUser',
      }),
      {
        body: {
          client_id: 'dina-rest',
          grant_type: 'password',
          password,
          username,
        },
      }
    )
    .then(result => {
      return result.accessToken
    })
}

const jsonApiValidator = createSystemFrontendValidator({
  schema: jsonApiSchema,
  throwOnError: true,
  type: 'config',
})

const createTestClient = ({
  authToken,
  validateInput = false,
  validateOutput = true,
}) => {
  return createApiClient({
    baseUrl: testApiUrl,
    mapHeaders: headers => {
      return {
        ...headers,
        Authorization: `bearer ${authToken}`,
      }
    },
    validateInput,
    validateOutput,
    validateResponse: json => {
      jsonApiValidator(json)
      return json
    },
  })
}

exports.makeTestCall = ({
  authToken,
  body,
  operationId,
  pathParams,
  queryParams,
  validateInput = false,
  validateOutput = true,
}) => {
  const testClient = createTestClient({
    authToken,
    operationId,
    validateInput,
    validateOutput,
  })
  return testClient.call(
    createEndpoint({
      operationId,
    }),
    { body, pathParams, queryParams }
  )
}
