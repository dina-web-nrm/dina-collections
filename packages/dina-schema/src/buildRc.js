const packageJson = require('../package.json')
const build = require('./factories/build')

console.log('start create rc specification')
build({
  setCurrent: false,
  version: packageJson.version,
})

console.log('done create rc specification')
