const readScriptEnv = require('./readScriptEnv')

module.exports = function getServerEnvVariable({ server = '', variableName }) {
  const env = readScriptEnv()
  const envVariableFullName = [server.toUpperCase(), variableName].join('_')

  const variable = env[envVariableFullName]
  if (!variable) {
    throw new Error(
      `${variableName} for server server: ${server} not found in env file at ${
        envVariableFullName
      }`
    )
  }
  return variable
}
