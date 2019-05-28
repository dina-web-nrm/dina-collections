require('console.table')
const buildOptions = require('./buildOptions')
const listScripts = require('./listScripts')
const inspectScript = require('./inspectScript')
const buildMarkdown = require('./buildMarkdown')
const test = require('./test')

const options = buildOptions()

const scriptDocs = require(options.inputPath) // eslint-disable-line
const packageJson = require(options.packageJsonPath) // eslint-disable-line

if (options.build) {
  buildMarkdown({ options, packageJson })
  test({ packageJson, scriptDocs: options.scriptDocs })
} else if (options.scriptKey) {
  inspectScript({ options, scriptKey: options.scriptKey })
} else {
  listScripts({ options })
}
