/* eslint-disable import/no-dynamic-require, global-require */
const fs = require('fs')
const path = require('path')

module.exports = function readApis(apisBasePath) {
  const apisInfo = fs
    .readdirSync(apisBasePath)
    .filter(apiName => {
      const apiPath = path.join(apisBasePath, apiName)
      return fs.statSync(apiPath).isDirectory()
    })
    .reduce((obj, apiName) => {
      const infoPath = path.join(apisBasePath, apiName, 'info')
      return {
        ...obj,
        [apiName]: require(infoPath),
      }
    }, {})

  return Object.keys(apisInfo).reduce((obj, key) => {
    const { description } = apisInfo[key]

    return {
      ...obj,
      [key]: {
        description,
        name: key,
      },
    }
  }, {})
}
