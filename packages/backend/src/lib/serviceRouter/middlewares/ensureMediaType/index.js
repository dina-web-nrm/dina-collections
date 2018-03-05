const validateAccept = require('./validateAccept')
const validateContentType = require('./validateContentType')

module.exports = function ensureMediaTypeMiddleware() {
  return (req, res, next) => {
    const {
      body,
      headers: { accept = '', 'content-type': contentType = '' },
    } = req

    const acceptError = validateAccept(accept)
    if (acceptError) {
      return next(acceptError)
    }

    const contentTypeError = validateContentType(contentType, body)
    if (contentTypeError) {
      return next(contentTypeError)
    }

    return next()
  }
}
