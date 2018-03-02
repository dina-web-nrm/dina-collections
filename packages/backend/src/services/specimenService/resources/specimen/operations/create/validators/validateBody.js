const objectPath = require('object-path')

module.exports = function validateBody(body) {
  // todo solve with x-server-required keyword for schema
  console.log('bodybodybodybodybodybodybodybodybodybody', body)
  if (
    !objectPath.get(
      body,
      'data.attributes.individualGroup.identifiers.0.identifier.value'
    )
  ) {
    const error = new Error('Catalog number is required')
    error.status = 400
    throw error
  }
}
