const envDescribe = require('./envDescribe')

module.exports = envDescribe({
  name: 'backendDbDescribe',
  runInEnv: ['TEST_DB'],
})
