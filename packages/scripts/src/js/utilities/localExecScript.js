const localExecCmd = require('./localExecCmd')
const getLocalRootFullPath = require('./getLocalRootFullPath')
const getBashScriptRelativePath = require('./getBashScriptRelativePath')
const captureArgString = require('./captureArgString')
const captureScriptName = require('./captureScriptName')

module.exports = function localExecScript() {
  const rootPath = getLocalRootFullPath()

  const scriptName = captureScriptName()
  const argString = captureArgString()

  const scriptRelativePath = getBashScriptRelativePath(scriptName)

  const cmd = `cd ${rootPath} && sh ./${scriptRelativePath} ${argString}`
  return localExecCmd({ cmd, execFromRoot: false })
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
    })
}
