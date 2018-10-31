const remoteExecCmd = require('./remoteExecCmd')
const getBashScriptRelativePath = require('./getBashScriptRelativePath')
const getServerRootFullPath = require('./getServerRootFullPath')
const captureArgString = require('./captureArgString')
const captureScriptName = require('./captureScriptName')

module.exports = function remoteExecScript({ server }) {
  const scriptName = captureScriptName()
  const argString = captureArgString()
  const repoRootPath = getServerRootFullPath(server)
  const scriptPath = getBashScriptRelativePath(scriptName)

  const cmd = `sh ./${scriptPath} ${argString}`
  return remoteExecCmd({
    cmd,
    rootPath: repoRootPath,
    server,
  })
    .then(res => {
      console.log('SUCCESS')
      console.log('---------')
      console.log(res)
      console.log('---------')
    })
    .catch(err => {
      console.log('FAIL')
      console.log('---------')
      console.log(err)
      console.log('---------')
      process.exit(1)
    })
}
