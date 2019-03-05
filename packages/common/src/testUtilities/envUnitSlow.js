const hookInEnv = require('./hookInEnv')
const describeInEnv = require('./describeInEnv')

const runInEnv = ['TEST_UNIT']
const dontRunInEnv = ['TEST_UNIT_FAST']

exports.describe = describeInEnv({
  dontRunInEnv,
  runInEnv,
})

exports.hook = hookInEnv({
  dontRunInEnv,
  runInEnv,
})
