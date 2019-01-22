const readScriptEnv = require('./readScriptEnv')

module.exports = function getServerEnvVariable({
  serverName = '',
  variableName,
}) {
  const env = readScriptEnv()
  const envVariableFullName = [serverName.toUpperCase(), variableName].join('_')

  const variable = env[envVariableFullName]
  if (!variable) {
    throw new Error(
      `${variableName} for server server: ${
        serverName
      } not found in env file at ${envVariableFullName}`
    )
  }
  return variable
}
