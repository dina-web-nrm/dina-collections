const localExecCmd = require('./localExecCmd')
const remoteExecCmd = require('./remoteExecCmd')

module.exports = ({ serverName, ...rest } = {}) => {
  if (serverName === 'local') {
    return localExecCmd({
      ...rest,
    })
  }
  return remoteExecCmd({
    serverName,
    ...rest,
  })
}
