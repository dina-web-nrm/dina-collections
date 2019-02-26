const envDescribe = require('./envDescribe')

module.exports = envDescribe({
  name: 'unitDescribe',
  runInEnv: ['TEST_UNIT'],
})
