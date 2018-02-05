const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
require('isomorphic-fetch')

const jsonApiSchema = require('../../utilities/apiClient/schemas/jsonApi')
const { createSystemModelSchemaValidator } = require('../../utilities/error')
const createEndpoint = require('../../utilities/endpointFactory/server')
const createApiClient = require('../../utilities/apiClient')

const dotEnvPath = path.join(__dirname, '../../../.env.test.local')

const {
  REACT_APP_TEST_API_URL: apiUrl,
  REACT_APP_TEST_AUTH_URL: authUrl,
  REACT_APP_TEST_PASSWORD: defaultPassword,
  REACT_APP_TEST_USERNAME: defaultUsername,
} = dotenv.parse(fs.readFileSync(dotEnvPath))

const createAuthClient = ({ baseUrl = authUrl } = {}) => {
  return createApiClient({
    baseUrl,
    mapResponse: ({ json }) => json,
  })
}

export const login = (
  { password = defaultPassword, username = defaultUsername } = {}
) => {
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

export const createTestClient = ({
  authToken,
  validateInput = false,
  validateOutput = true,
}) => {
  return createApiClient({
    baseUrl: apiUrl,
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

export const makeTestCall = ({
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
