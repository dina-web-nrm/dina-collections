/* eslint-disable import/no-dynamic-require, global-require */
const fs = require('fs')
const path = require('path')

const createIndexFile = ({ available, versionIndexFilePath }) => {
  const indexFile =
    available // eslint-disable-line prefer-template
      .map(availableVersion => {
        return `exports['${availableVersion}'] = {
  models: require('./${availableVersion}/models.json'),
  normalizedModels: require('./${availableVersion}/normalizedModels.json'),
  openApi: require('./${availableVersion}/openApi.json'),
  normalizedOpenApi: require('./${availableVersion}/normalizedOpenApi.json'),
}`
      })
      .join('\n') + '\n'

  fs.writeFileSync(versionIndexFilePath, indexFile)
}

const updateVersionsIndex = ({
  setCurrent,
  version,
  versionsBaseDirectory,
}) => {
  const versionsInfoFilePath = path.join(versionsBaseDirectory, 'info.json')
  const versionIndexFilePath = path.join(versionsBaseDirectory, 'index.js')

  const versions = fs
    .readdirSync(versionsBaseDirectory)
    .filter(fileName => fileName !== 'info.json')
    .filter(fileName => fileName !== 'index.js')
    .filter(filename => filename[0] !== '.')

  const versionFile = fs.existsSync(versionsInfoFilePath)
    ? require(versionsInfoFilePath)
    : {}

  const versionsInfo = {
    available: versions,
    current: setCurrent ? version : versionFile.current,
    latest: versions.sort()[0],
  }
  fs.writeFileSync(versionsInfoFilePath, JSON.stringify(versionsInfo, null, 2))

  createIndexFile({
    available: versionsInfo.available,
    versionIndexFilePath,
  })
}

const ensureDirectoryExistence = dirPath => {
  if (fs.existsSync(dirPath)) {
    return true
  }
  fs.mkdirSync(dirPath)
  return true
}

const getOpenApiFileName = normalize => {
  return normalize ? 'normalizedOpenApi.json' : 'openApi.json'
}

const getModelsFileName = normalize => {
  return normalize ? 'normalizedModels.json' : 'models.json'
}

module.exports = function write(
  { models, normalize, openApi, setCurrent, version = '' } = {}
) {
  const buildDirectory = path.join(__dirname, '../../../../common/dist')
  const versionsBaseDirectory = path.join(buildDirectory, 'versions')
  const baseDirectory = version
    ? path.join(versionsBaseDirectory, version)
    : path.join(buildDirectory)

  ensureDirectoryExistence(buildDirectory)
  ensureDirectoryExistence(versionsBaseDirectory)
  ensureDirectoryExistence(baseDirectory)

  if (openApi) {
    fs.writeFileSync(
      path.join(baseDirectory, getOpenApiFileName(normalize)),
      JSON.stringify(openApi, null, 2)
    )
  }

  if (models) {
    fs.writeFileSync(
      path.join(baseDirectory, getModelsFileName(normalize)),
      JSON.stringify(models, null, 2)
    )
  }

  if (version) {
    updateVersionsIndex({
      setCurrent,
      version,
      versionsBaseDirectory,
    })
  }
}
