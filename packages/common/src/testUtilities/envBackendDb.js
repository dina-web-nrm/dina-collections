const hookInEnv = require('./hookInEnv')
const describeInEnv = require('./describeInEnv')

const runInEnv = ['TEST_DB']

exports.describe = describeInEnv({
  runInEnv,
})

exports.hook = hookInEnv({
  runInEnv,
})
