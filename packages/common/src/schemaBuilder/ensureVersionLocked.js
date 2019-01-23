const path = require('path')

const buildDirectory = path.join(__dirname, '../../../common/dist/schemas')
const apiCurrentInfoPath = path.join(
  buildDirectory,
  'apiVersions',
  'current',
  'info'
)
const modelCurrentInfoPath = path.join(
  buildDirectory,
  'modelVersions',
  'current',
  'info'
)

const apiInfo = require(apiCurrentInfoPath) // eslint-disable-line
const modelInfo = require(modelCurrentInfoPath) // eslint-disable-line

if (apiInfo.candidate) {
  throw new Error('Current api is still in candidate. Run lock-schema')
}

if (modelInfo.candidate) {
  throw new Error('Current model is still in candidate. Run lock-schema')
}
