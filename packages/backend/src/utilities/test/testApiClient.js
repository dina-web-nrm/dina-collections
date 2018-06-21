require('isomorphic-fetch')

const jsonApiSchema = require('common/src/apiClient/schemas/jsonApi')
const createSystemBackendValidator = require('common/src/error/validators/createSystemBackendValidator')
const createEndpoint = require('common/src/endpointFactory/server')
const { createApiClient } = require('common/src/apiClient')

const config = require('../../apps/test/config')

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

const jsonApiValidator = createSystemBackendValidator({
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
      try {
        jsonApiValidator(json)
      } catch (err) {
        console.log('INPUT:', json) // eslint-disable-line no-console
        throw err
      }

      return json
    },
  })
}

let lastCallPromise = null

const awaitLastPromise = () => {
  if (!lastCallPromise) {
    return Promise.resolve(true)
  }
  return lastCallPromise
}

let resolveLastCallPromise = null

const createLastCallPromise = () => {
  lastCallPromise = new Promise(resolve => {
    resolveLastCallPromise = resolve
  })
}

exports.makeTestCall = ({
  authToken,
  body,
  operationId,
  parallel = false,
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
  return awaitLastPromise().then(() => {
    if (!parallel) {
      createLastCallPromise()
    }

    return testClient
      .call(
        createEndpoint({
          operationId,
        }),
        { body, pathParams, queryParams }
      )
      .then(res => {
        resolveLastCallPromise()
        return res
      })
      .catch(err => {
        if (!parallel) {
          resolveLastCallPromise()
        }

        throw err
      })
  })
}
