const remoteExecCmd = require('./remoteExecCmd')
const getBashScriptRelativePath = require('./getBashScriptRelativePath')
const getServerRootFullPath = require('./getServerRootFullPath')
const captureArgString = require('./captureArgString')
const captureScriptNameFromArgs = require('./captureScriptNameFromArgs')

module.exports = function remoteExecScript({
  printResult = true,
  scriptName: scriptNameInput,
  serverName,
  throwOnError,
}) {
  const scriptName = scriptNameInput || captureScriptNameFromArgs()
  const argString = captureArgString()
  const repoRootPath = getServerRootFullPath(serverName)
  const scriptPath = getBashScriptRelativePath(scriptName)

  const cmd = `./${scriptPath} ${argString}`
  return remoteExecCmd({
    cmd,
    printResult,
    rootPath: repoRootPath,
    serverName,
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
