const hookInEnv = require('./hookInEnv')
const describeInEnv = require('./describeInEnv')

const runInEnv = ['TEST_API']

exports.describe = describeInEnv({
  runInEnv,
})

exports.hook = hookInEnv({
  runInEnv,
})
