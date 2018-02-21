const buildResponse = require('./buildResponse')
const buildRequest = require('./buildRequest')

module.exports = function buildEndpoint({
  method,
  operationId,
  path,
  pathParams: rawPathParams = [],
  auth = true,
  queryParams,
  relationBase,
  request: requestInput,
  resource,
  response: responseInput = {},
  summary,
}) {
  const pathParams = rawPathParams.reduce((obj, key) => {
    return {
      ...obj,
      [key]: {
        description: `${resource} ${key}`,
        example: '1',
        required: true,
        schema: {
          type: 'string',
        },
      },
    }
  }, {})

  const selfLink = path

  const response = buildResponse({
    resource,
    ...responseInput,
    operationId, // eslint-disable-line
    relationBase,
    selfLink,
  })

  const request = requestInput
    ? buildRequest({
        resource,
        ...requestInput,
        operationId, // eslint-disable-line
      })
    : undefined

  return {
    method,
    operationId,
    path,
    pathParams,
    queryParams,
    request,
    response,
    security: auth
      ? [
          {
            bearerAuth: [],
          },
        ]
      : undefined,
    summary,
  }
}
