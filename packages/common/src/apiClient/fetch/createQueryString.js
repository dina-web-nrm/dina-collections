module.exports = function createQueryString(params = {}) {
  return encodeURI(
    Object.keys(params)
      .filter(key => params[key] !== undefined)
      .map(key => `${key}=${params[key]}`)
      .join('&')
  )
}
