const allowedEnvs = ['production', 'development', 'test']

module.exports = function ensureNodeEnv(expectedEnvInput) {
  const expectedEnvs = Array.isArray(expectedEnvInput)
    ? expectedEnvInput
    : [expectedEnvInput]

  expectedEnvs.forEach(expectedEnv => {
    if (!allowedEnvs.includes(expectedEnv)) {
      throw new Error(
        `Unexpected env: ${expectedEnv} Has to be one of: [${allowedEnvs.join(
          ', '
        )}]`
      )
    }
  })

  const currentEnv = process.env.NODE_ENV

  if (!expectedEnvs.includes(currentEnv)) {
    throw new Error(
      `current env: ${currentEnv} not in expectedEnvs: [${expectedEnvs.join(
        ', '
      )}] `
    )
  }
}
