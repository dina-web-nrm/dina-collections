require('isomorphic-fetch')

const jsonApiSchema = require('common/es5/apiClient/schemas/jsonApi')
const { createSystemModelSchemaValidator } = require('common/es5/error')
const createEndpoint = require('common/es5/endpointFactory/server')
const createApiClient = require('common/es5/apiClient')

const config = require('../../config')

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

const jsonApiValidator = createSystemModelSchemaValidator({
  schema: jsonApiSchema,
  throwOnError: true,
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
