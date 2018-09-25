const objectPath = require('object-path')
const backendError400 = require('common/src/error/errorFactories/backendError400')
const validateCatalogNumberFormat = require('../utilities/validateCatalogNumberFormat')

const validate = ({ request, serviceInteractor }) => {
  const identifier = objectPath.get(request, 'body.data.attributes.identifier')
  const requireUnique = objectPath.get(request, 'queryParams.requireUnique')
  if (!identifier) {
    backendError400({
      code: 'REQUEST_ERROR',
      detail: 'Identifier missing',
    })
  }

  try {
    validateCatalogNumberFormat(identifier)
  } catch (err) {
    backendError400({
      code: 'REQUEST_ERROR',
      detail: err.message,
    })
  }
  if (!requireUnique) {
    return true
  }

  return serviceInteractor
    .getMany({
      request: {
        queryParams: {
          filter: {
            identifier,
          },
        },
      },
      resource: 'catalogNumber',
    })
    .then(({ data: items }) => {
      if (items && items.length) {
        backendError400({
          code: 'REQUEST_ERROR',
          detail: `identifier: ${identifier} already exist`,
          parameterErrors: [
            {
              errorCode: 'duplicate',
              fullPath: 'identifier',
            },
          ],
        })
      }
    })
}

const create = ({ request, serviceInteractor }) => {
  const identifier = objectPath.get(request, 'body.data.attributes.identifier')
  if (!identifier) {
    backendError400({
      code: 'REQUEST_ERROR',
      detail: 'Missing identifier',
    })
  }
  return serviceInteractor
    .validate({
      request: {
        body: {
          data: {
            attributes: {
              identifier: request.body.data.attributes.identifier,
            },
          },
        },
        queryParams: {
          requireUnique: true,
        },
      },
      resource: 'catalogNumber',
    })
    .then(() => {})
}

exports.create = [create]
exports.validate = [validate]
