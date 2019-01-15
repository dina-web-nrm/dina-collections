const readScriptEnv = require('./readScriptEnv')

module.exports = function getAvailableServerNames() {
  const env = readScriptEnv()
  const keys = Object.keys(env)
  const serverMap = {}

  keys.forEach(key => {
    if (key.indexOf('_SERVER') > -1) {
      const serverName = key.split('_SERVER')[0]
      serverMap[serverName] = true
    }
  })

  return Object.keys(serverMap).map(serverName => {
    return serverName.toLowerCase()
  })
}
