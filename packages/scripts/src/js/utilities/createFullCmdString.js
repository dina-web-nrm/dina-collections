const createCmdWithEnv = require('./createCmdWithEnv')
const getLocalRootFullPath = require('./getLocalRootFullPath')

const defaultRootPath = getLocalRootFullPath()

module.exports = function createFullCmdString({
  cmdInput = 'ls',
  envMap,
  execFromRoot = true,
  host,
  rootPath = defaultRootPath,
  user,
}) {
  let cmd = cmdInput

  if (execFromRoot) {
    cmd = `cd ${rootPath} && ${cmd}`
  }

  const baseMessage = host
    ? `Executing remote ${user}@${host} ->`
    : 'Executing locally ->'

  console.log(`${baseMessage} ${cmd}`)

  cmd = createCmdWithEnv({
    cmd,
    envMap,
  })

  return cmd
}
