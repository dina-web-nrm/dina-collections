const createBody = require('./createBody')
const createUrl = require('./createUrl')
const parseResponse = require('./parseResponse')

module.exports = function wrappedFetch({
  apiConfig,
  endpointConfig,
  methodConfig,
  request,
}) {
  const { method } = methodConfig
  const { body, headers } = request

  const formattedBody = createBody({
    body,
    headers,
  })

  const url = createUrl({
    apiConfig,
    endpointConfig,
    methodConfig,
    request,
  })

  return fetch(url, {
    body: formattedBody,
    headers,
    method,
  }).then(parseResponse)
}
