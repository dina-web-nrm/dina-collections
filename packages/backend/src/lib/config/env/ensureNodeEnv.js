const allowedEnvs = ['production', 'development', 'test']

module.exports = function ensureNodeEnv(expectedEnv) {
  if (!allowedEnvs.includes(expectedEnv)) {
    throw new Error(
      `Unexpected env: ${expectedEnv} Has to be one of: [${allowedEnvs.join(
        ', '
      )}]`
    )
  }

  if (expectedEnv !== process.env.NODE_ENV) {
    throw new Error(
      `expectedEnv: ${expectedEnv} !== process.env.NODE_ENV: ${
        process.env.NODE_ENV
      } `
    )
  }
}
