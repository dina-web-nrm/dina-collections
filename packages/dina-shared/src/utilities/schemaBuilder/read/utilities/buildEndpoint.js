const buildResponse = require('./buildEndpointResponse')
const buildRequest = require('./buildEndpointRequest')
const buildRawResponse = require('./buildRawResponse')
const buildRawRequest = require('./buildRawRequest')

module.exports = function buildEndpoint({
  method,
  operationId,
  path,
  pathParams: rawPathParams = [],
  relationBase,
  resource,
  response: responseInput = {},
  request: requestInput,
  responseRelations: rawResponseRelations = [],
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
  const relationSelfLink =
    responseInput.format === 'array' ? `${selfLink}/{id}` : selfLink

  const responseRelations = rawResponseRelations.map(content => {
    if (typeof content === 'string') {
      return {
        key: content,
        link: `${relationBase || relationSelfLink}/${content}`,
      }
    }
    return content
  })
  const response = responseInput.raw
    ? buildRawResponse({ operationId, responseInput })
    : buildResponse({
        format: responseInput.format,
        operationId,
        relations: responseRelations.map(({ key, link }) => {
          return {
            key,
            selfLink: link,
          }
        }),
        resource,
        selfLink,
      })

  let request

  if (requestInput) {
    if (requestInput.raw) {
      request = buildRawRequest({ operationId, requestInput })
    } else {
      request = buildRequest({
        description: requestInput.description,
        format: requestInput.format,
        operationId,
        resource,
      })
    }
  }

  return {
    method,
    operationId,
    path,
    pathParams,
    request,
    response,
    summary,
  }
}
