const fs = require('fs')
const path = require('path')
const { models, openApi, swagger } = require('./index.js')

const createIndexFile = ({ available, versionIndexFilePath }) => {
  const indexFile =
    available // eslint-disable-line prefer-template
      .map(availableVersion => {
        return `exports['${availableVersion}'] = {
  models: require('./${availableVersion}/models.json'),
  openApi: require('./${availableVersion}/openApi.json'),
  swagger: require('./${availableVersion}/swagger.json'),
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

module.exports = function build({ version = '', setCurrent } = {}) {
  const buildDirectory = path.join(__dirname, '../../build')
  const versionsBaseDirectory = path.join(buildDirectory, 'versions')
  const baseDirectory = version
    ? path.join(versionsBaseDirectory, version)
    : path.join(buildDirectory)

  ensureDirectoryExistence(buildDirectory)
  ensureDirectoryExistence(versionsBaseDirectory)
  ensureDirectoryExistence(baseDirectory)

  fs.writeFileSync(
    path.join(baseDirectory, 'openApi.json'),
    JSON.stringify(openApi, null, 2)
  )

  fs.writeFileSync(
    path.join(baseDirectory, 'models.json'),
    JSON.stringify(models, null, 2)
  )

  fs.writeFileSync(
    path.join(baseDirectory, 'swagger.json'),
    JSON.stringify(swagger, null, 2)
  )
  if (version) {
    updateVersionsIndex({
      setCurrent,
      version,
      versionsBaseDirectory,
    })
  }
}
