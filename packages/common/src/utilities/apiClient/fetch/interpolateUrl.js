const pathParametersRegex = /\{([a-zA-Z0-9]+)}/g

module.exports = function interpolateUrl(url, pathParams) {
  let resultURL = url
  const requiredPathParameters = resultURL.match(pathParametersRegex) || []

  requiredPathParameters.forEach(p => {
    const cleanParameter = p.replace(/[{}]/g, '') // yes
    if (pathParams[cleanParameter] !== undefined) {
      resultURL = resultURL.replace(`${p}`, pathParams[cleanParameter])
    } else {
      throw new Error(`Required path parameter ${cleanParameter} not supplied.`)
    }
  })

  return resultURL
}
