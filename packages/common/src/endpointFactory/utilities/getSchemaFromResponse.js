module.exports = function getSchemaFromResponse(response) {
  return (
    response &&
    response.content &&
    response.content['application/vnd.api+json'] &&
    response.content['application/vnd.api+json'].schema
  )
}
