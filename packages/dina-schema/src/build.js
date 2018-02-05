const packageJson = require('../package.json')
const build = require('./factories/build')

console.log('start create specification')
build()
build({
  setCurrent: true,
  version: packageJson.version,
})

console.log('done create specification')
