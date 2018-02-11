module.exports = function createFormBody(body) {
  return Object.keys(body).reduce((str, bodyKey) => {
    const val = body[bodyKey]
    if (str.length) {
      return `${str}&${bodyKey}=${val}`
    }
    return `${bodyKey}=${val}`
  }, '')
}
