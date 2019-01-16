const remoteExecCmd = require('./remoteExecCmd')
const getBashScriptRelativePath = require('./getBashScriptRelativePath')
const getServerRootFullPath = require('./getServerRootFullPath')
const captureArgString = require('./captureArgString')
const captureScriptName = require('./captureScriptName')

module.exports = function remoteExecScript({
  printResult = true,
  scriptName: scriptNameInput,
  server,
  throwOnError,
}) {
  const scriptName = scriptNameInput || captureScriptName()
  const argString = captureArgString()
  const repoRootPath = getServerRootFullPath(server)
  const scriptPath = getBashScriptRelativePath(scriptName)

  const cmd = `./${scriptPath} ${argString}`
  return remoteExecCmd({
    cmd,
    printResult,
    rootPath: repoRootPath,
    server,
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
