module.exports = function getSchemaFromRequestBody(requestBody) {
  return (
    requestBody &&
    requestBody.content &&
    requestBody.content['application/vnd.api+json'] &&
    requestBody.content['application/vnd.api+json'].schema
  )
}
