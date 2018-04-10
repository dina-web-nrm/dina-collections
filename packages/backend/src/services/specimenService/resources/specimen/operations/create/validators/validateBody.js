const backendError400 = require('common/src/error/errorFactories/backendError400')
const objectPath = require('object-path')

module.exports = function validateBody(body) {
  if (!objectPath.get(body, 'data.attributes.identifiers.0.value')) {
    backendError400({
      code: 'REQUEST_ERROR',
      detail: 'Catalog number is required',
    })
  }
}
