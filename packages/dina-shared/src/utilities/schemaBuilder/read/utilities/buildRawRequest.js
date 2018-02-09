module.exports = function buildRawRequest({ operationId, requestInput }) {
  const name = `${operationId}Request`
  const response = {
    name,
    ...requestInput,
  }

  delete response.raw

  return response
}
