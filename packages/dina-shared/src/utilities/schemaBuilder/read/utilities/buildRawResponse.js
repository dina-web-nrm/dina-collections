module.exports = function buildRawResponse({ operationId, responseInput }) {
  const name = `${operationId}Response`
  const response = {
    name,
    ...responseInput,
  }

  delete response.raw

  return response
}
