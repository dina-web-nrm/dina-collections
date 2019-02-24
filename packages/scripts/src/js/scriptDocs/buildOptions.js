const path = require('path')
const captureFlagFromArgs = require('../utilities/captureFlagFromArgs')

module.exports = function buildOptions() {
  const inputPath =
    captureFlagFromArgs({
      flag: '--inputPath',
    }) || path.join(process.cwd(), 'scriptDocs')

  const outputPath =
    captureFlagFromArgs({
      flag: '--outputPath',
    }) || path.join(process.cwd(), 'documentation/scripts.md')

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

  const packageJsonPath = path.join(process.cwd(), 'package.json')

  return {
    build,
    inputPath,
    list,
    outputPath,
    packageJsonPath,
    test,
  }
}
