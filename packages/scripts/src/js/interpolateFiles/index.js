const glob = require('glob')
const path = require('path')
const getLocalRootFullPath = require('../utilities/getLocalRootFullPath')
const captureFlagFromArgs = require('../utilities/captureFlagFromArgs')
const promptContinue = require('../utilities/promptContinue')
const {
  interpolateFile,
  fileContainsInterpolations,
} = require('./interpolateFile')

const patternInput = captureFlagFromArgs({ flag: '-p', throwOnMissing: true })
const removeInterpolations = captureFlagFromArgs({
  flag: '-r',
  throwOnMissing: false,
})

const patterns = patternInput.split(',')
const rootPath = getLocalRootFullPath()

const filesToInterpolate = []
patterns.forEach(pattern => {
  const paths = glob.sync(pattern, {
    cwd: rootPath,
  })
  if (paths.length > 30) {
    throw new Error(
      `Pattern: ${pattern} matched more then 10 paths, provide more specific pattern`
    )
  }

  paths.forEach(relativeFilePath => {
    const fullPath = path.join(rootPath, relativeFilePath)
    if (fileContainsInterpolations({ filePath: fullPath })) {
      filesToInterpolate.push(fullPath)
    }
  })
})

const message = removeInterpolations
  ? `Continue and interpolate the following files: \n ${filesToInterpolate.join(
      '\n'
    )}`
  : `Continue and remove interpolation from  the following files: \n ${filesToInterpolate.join(
      '\n'
    )}`

return promptContinue({
  message,
})
  .then(() => {
    filesToInterpolate.forEach(filePath => {
      interpolateFile({
        filePath,
        removeInterpolations,
        write: true,
      })
    })
  })
  .catch(err => {
    if (err.message === 'Got: n. Aborting') {
      console.log('Aborted - No files interpolated')
    } else {
      console.log('err', err)
    }
  })
