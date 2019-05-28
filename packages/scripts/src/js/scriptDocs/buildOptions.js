const path = require('path')
const captureFlagFromArgs = require('../utilities/captureFlagFromArgs')

module.exports = function buildOptions() {
  const packageJsonPath = path.join(
    process.cwd(),
    captureFlagFromArgs({
      flag: '--packageJsonPath',
    }) || 'package.json'
  )

  const inputPath = path.join(
    process.cwd(),
    captureFlagFromArgs({
      flag: '--inputPath',
    }) || 'scriptDocs'
  )

  const scriptDocs = require(inputPath) // eslint-disable-line

  const { meta: { outputPath: metaOutputPath } = {} } = scriptDocs

  const lastArg = process.argv[process.argv.length - 1]
  let scriptKey
  if (!lastArg.includes('/')) {
    scriptKey = lastArg
  }

  const outputPath = path.join(
    process.cwd(),
    captureFlagFromArgs({
      flag: '--outputPath',
    }) || metaOutputPath
  )

  const list =
    captureFlagFromArgs({
      flag: '--list',
    }) === 'true' || false

  const build =
    captureFlagFromArgs({
      flag: '--build',
    }) === 'true' || false

  const test =
    captureFlagFromArgs({
      flag: '--test',
    }) === 'true' || false

  return {
    build,
    inputPath,
    list,
    outputPath,
    packageJsonPath,
    scriptDocs,
    scriptKey,
    test,
  }
}
