const fs = require('fs')
const path = require('path')

const buildDirectory = path.join(__dirname, '../../../common/dist/schemas')

const modelPackagePath = path.join(__dirname, '../../../models/package.json')
const backendPackagePath = path.join(__dirname, '../../../backend/package.json')

const modelVersion = require(modelPackagePath).version // eslint-disable-line
const backendVersion = require(backendPackagePath).version // eslint-disable-line
const apiVersion = `${modelVersion}-${backendVersion}`

const apiVersionPath = path.join(buildDirectory, 'apiVersions', apiVersion)

const apiInfoPath = path.join(apiVersionPath, 'info.json')
const apiInfo = require(apiInfoPath) // eslint-disable-line

if (!apiInfo.candidate) {
  throw new Error(
    `Not allowed to lock non candidate schema. Tried to override apiVersion: ${
      apiVersion
    }`
  )
}

apiInfo.candidate = false

fs.writeFileSync(path.join(apiInfoPath), JSON.stringify(apiInfo, null, 2))

const apiCurrentPath = path.join(buildDirectory, 'apiVersions', 'current')

fs.writeFileSync(
  path.join(apiCurrentPath, 'info.json'),
  JSON.stringify(apiInfo, null, 2)
)

const modelVersionPath = path.join(
  buildDirectory,
  'modelVersions',
  modelVersion
)

const modelInfoPath = path.join(modelVersionPath, 'info.json')
const modelInfo = require(modelInfoPath) // eslint-disable-line

if (!modelInfo.candidate) {
  throw new Error(
    `Not allowed to lock non candidate schema. Tried to override modelVersion: ${
      modelVersion
    }`
  )
}

modelInfo.candidate = false

fs.writeFileSync(path.join(modelInfoPath), JSON.stringify(modelInfo, null, 2))

const modelCurrentPath = path.join(buildDirectory, 'modelVersions', 'current')

fs.writeFileSync(
  path.join(modelCurrentPath, 'info.json'),
  JSON.stringify(modelInfo, null, 2)
)
