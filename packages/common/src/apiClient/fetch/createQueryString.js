module.exports = function createQueryString(params = {}, encode = true) {
  const string = Object.keys(params)
    .filter(key => params[key] !== undefined)
    .reduce((strings, key) => {
      const param = params[key]
      if (typeof param === 'object' && param !== null) {
        const paramStrings = Object.keys(param).map(paramKey => {
          return `${key}[${paramKey}]=${param[paramKey]}`
        })
        return [...strings, ...paramStrings]
      }
      return [...strings, `${key}=${param}`]
    }, [])
    .join('&')

  return encode ? encodeURI(string) : string
}
