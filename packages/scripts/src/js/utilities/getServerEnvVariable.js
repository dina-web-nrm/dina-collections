const readScriptEnv = require('./readScriptEnv')

module.exports = function getServerEnvVariable({
  required = true,
  serverName = '',
  variableName,
}) {
  const env = readScriptEnv()
  const envVariableFullName = [serverName.toUpperCase(), variableName].join('_')

  const variable = env[envVariableFullName]
  if (!variable && required) {
    throw new Error(
      `${variableName} for server server: ${
        serverName
      } not found in env file at ${envVariableFullName}`
    )
  }
  return variable
}
