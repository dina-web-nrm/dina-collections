const createFormBody = require('./createFormBody')
const createJsonBody = require('./createJsonBody')

module.exports = function createBody({ body, headers }) {
  let formattedBody
  if (Object.keys(body).length) {
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      formattedBody = createFormBody(body)
    } else {
      formattedBody = createJsonBody(body)
    }
  }

  return formattedBody
}
