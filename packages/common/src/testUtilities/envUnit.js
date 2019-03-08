const hookInEnv = require('./hookInEnv')
const describeInEnv = require('./describeInEnv')

const runInEnv = ['TEST_UNIT']

exports.describe = describeInEnv({
  runInEnv,
})

exports.hook = hookInEnv({
  runInEnv,
})
