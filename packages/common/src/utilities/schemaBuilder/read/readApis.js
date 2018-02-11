/* eslint-disable import/no-dynamic-require, global-require */

module.exports = function readApis(apisBasePath) {
  const apis = require(apisBasePath)
  return Object.keys(apis).reduce((obj, key) => {
    const info = apis[key].info || {}

    return {
      ...obj,
      [key]: {
        ...info,
        name: key,
      },
    }
  }, {})
}
