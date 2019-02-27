module.exports = function createEnvDescribe(input) {
  let runInEnv = []
  let dontRunInEnv = []
  let envDescribeName
  if (typeof input === 'string') {
    runInEnv = [input]
  } else if (typeof input === 'object') {
    runInEnv = input.runInEnv || []
    dontRunInEnv = input.dontRunInEnv || []
    envDescribeName = input.name || ''
  } else {
    throw new Error('Provide string or object as input')
  }

  let shouldRun = false
  runInEnv.forEach(env => {
    if (process.env[env]) {
      shouldRun = true
    }
  })

  dontRunInEnv.forEach(env => {
    if (process.env[env]) {
      shouldRun = false
    }
  })

  return function envDescribe(name, ...rest) {
    if (!shouldRun) {
      return describe(name, () => {
        it(`Not running ${envDescribeName} because env requirements not fulfilled: runtInEnv: ${runInEnv.join(
          ', '
        )} dontRunInEnv: ${dontRunInEnv.join(', ')}`, () => {
          expect(1).toBe(1)
        })
      })
    }
    return describe(name, ...rest)
  }
}
