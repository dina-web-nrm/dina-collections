const localExecCmd = require('./localExecCmd')
const getLocalRootFullPath = require('./getLocalRootFullPath')
const getBashScriptRelativePath = require('./getBashScriptRelativePath')
const captureArgString = require('./captureArgString')
const captureScriptNameFromArgs = require('./captureScriptNameFromArgs')

module.exports = function localExecScript(
  { printResult = true, scriptName: scriptNameInput, throwOnError } = {}
) {
  const rootPath = getLocalRootFullPath()

  const scriptName = scriptNameInput || captureScriptNameFromArgs()
  const argString = captureArgString()

  const scriptRelativePath = getBashScriptRelativePath(scriptName)

  const cmd = `cd ${rootPath} && ./${scriptRelativePath} ${argString}`
  return localExecCmd({
    cmd,
    execFromRoot: false,
    printResult,
    throwOnError,
  })
    .then(res => {
      if (printResult) {
        console.log('SUCCESS')
        console.log('---------')
        console.log(res)
        console.log('---------')
      }

      return res
    })
    .catch(err => {
      if (printResult) {
        console.log('FAIL')
        console.log('---------')
        console.log(err)
        console.log('---------')
      } else {
        throw err
      }
      process.exit(1)
    })
}
