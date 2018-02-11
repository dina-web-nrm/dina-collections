require('isomorphic-fetch')

const jsonApiSchema = require('common/src/utilities/apiClient/schemas/jsonApi')
const {
  createSystemModelSchemaValidator,
} = require('common/src/utilities/error')
const createEndpoint = require('common/src/utilities/endpointFactory/server')
const createApiClient = require('common/src/utilities/apiClient')

const config = require('../../config')

const { testApiUrl, testAuthUrl, testUsername, testPassword } = config.test

const createAuthClient = ({ baseUrl = testAuthUrl } = {}) => {
  return createApiClient({
    baseUrl,
    mapResponse: ({ json }) => json,
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
    mapResponse: ({ json }) => {
      return json
    },
    validateInput,
    validateOutput,
    validateResponse: ({ json }) => {
      jsonApiValidator(json)
      return { json }
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
