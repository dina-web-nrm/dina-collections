const hookInEnv = require('./hookInEnv')
const describeInEnv = require('./describeInEnv')

const runInEnv = ['TEST_API', 'SAMPLE_DATA']

exports.describe = describeInEnv({
  runInEnv,
})

exports.hook = hookInEnv({
  runInEnv,
})
