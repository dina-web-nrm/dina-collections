const envDescribe = require('./envDescribe')

module.exports = envDescribe({
  name: 'backendApiDescribe',
  runInEnv: ['TEST_API'],
})
