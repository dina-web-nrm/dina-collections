const localExecScript = require('./localExecScript')
const remoteExecScript = require('./remoteExecScript')

module.exports = ({ serverName, ...rest } = {}) => {
  if (serverName === 'local') {
    return localExecScript({
      ...rest,
    })
  }
  return remoteExecScript({
    serverName,
    ...rest,
  })
}
