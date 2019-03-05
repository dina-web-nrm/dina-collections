module.exports = function shouldRunWithCurrentEnv(input) {
  let runInEnv = []
  let dontRunInEnv = []
  if (typeof input === 'string') {
    runInEnv = [input]
  } else if (typeof input === 'object') {
    runInEnv = input.runInEnv || []
    dontRunInEnv = input.dontRunInEnv || []
  } else {
    throw new Error('Provide string or object as input')
  }

  let shouldRun = false
  shouldRun = runInEnv.every(env => {
    if (process.env[env]) {
      return true
    }
    return false
  })

  dontRunInEnv.forEach(env => {
    if (process.env[env]) {
      shouldRun = false
    }
  })

  return shouldRun
}
