/* eslint-disable import/no-dynamic-require, global-require */
const fs = require('fs')
const path = require('path')

const ensureDirectoryExistence = dirPath => {
  if (fs.existsSync(dirPath)) {
    return true
  }
  fs.mkdirSync(dirPath)
  return true
}

const getModelsFileName = normalize => {
  return normalize ? 'normalizedModels.json' : 'models.json'
}

module.exports = function write(
  { apiVersion, modelVersion, models, normalize, openApi } = {}
) {
  const buildDirectory = path.join(__dirname, '../../../../common/dist/schemas')

  ensureDirectoryExistence(buildDirectory)
  if (openApi) {
    const apiVersionPath = path.join(buildDirectory, 'apiVersions', apiVersion)
    const infoPath = path.join(apiVersionPath, 'info.json')

    let currentInfo
    try {
      currentInfo = require(infoPath)
    } catch (err) {
      currentInfo = {
        candidate: true,
      }
    }

    if (!currentInfo.candidate) {
      throw new Error(
        `Not allowed to override non candidate schema. Tried to override apiVersion: ${
          apiVersion
        }`
      )
    }

    const info = {
      apiVersion,
      candidate: true,
      modelVersion,
    }

    ensureDirectoryExistence(apiVersionPath)
    fs.writeFileSync(
      path.join(apiVersionPath, 'openApi.json'),
      JSON.stringify(openApi, null, 2)
    )
    fs.writeFileSync(
      path.join(apiVersionPath, 'info.json'),
      JSON.stringify(info, null, 2)
    )

    const apiCurrentPath = path.join(buildDirectory, 'apiVersions', 'current')
    ensureDirectoryExistence(apiCurrentPath)
    fs.writeFileSync(
      path.join(apiCurrentPath, 'openApi.json'),
      JSON.stringify(openApi, null, 2)
    )
    fs.writeFileSync(
      path.join(apiCurrentPath, 'info.json'),
      JSON.stringify(info, null, 2)
    )
  }

  if (models) {
    const modelVersionPath = path.join(
      buildDirectory,
      'modelVersions',
      modelVersion
    )

    const infoPath = path.join(modelVersionPath, 'info.json')

    let currentInfo
    try {
      currentInfo = require(infoPath)
    } catch (err) {
      currentInfo = {
        candidate: true,
      }
    }

    if (!currentInfo.candidate) {
      throw new Error(
        `Not allowed to override non candidate schema. Tried to override modelVersion: ${
          modelVersion
        }`
      )
    }
    const info = {
      candidate: true,
      modelVersion,
    }

    ensureDirectoryExistence(modelVersionPath)
    fs.writeFileSync(
      path.join(modelVersionPath, getModelsFileName(normalize)),
      JSON.stringify(models, null, 2)
    )
    fs.writeFileSync(
      path.join(modelVersionPath, 'info.json'),
      JSON.stringify(info, null, 2)
    )

    const modelCurrentPath = path.join(
      buildDirectory,
      'modelVersions',
      'current'
    )
    ensureDirectoryExistence(modelCurrentPath)
    fs.writeFileSync(
      path.join(modelCurrentPath, getModelsFileName(normalize)),
      JSON.stringify(models, null, 2)
    )
    fs.writeFileSync(
      path.join(modelCurrentPath, 'info.json'),
      JSON.stringify(info, null, 2)
    )
  }
}
