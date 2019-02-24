require('console.table')
const buildOptions = require('./buildOptions')
const listScripts = require('./listScripts')
const inspectScript = require('./inspectScript')
const buildMarkdown = require('./buildMarkdown')
const test = require('./test')

const cmd = process.argv[2]

const options = buildOptions()

const scriptDocs = require(options.inputPath) // eslint-disable-line
const packageJson = require(options.packageJsonPath) // eslint-disable-line

if (options.test) {
  test()
} else if (options.build) {
  buildMarkdown({ options, scriptDocs })
} else if (options.list) {
  listScripts({ scriptDocs })
} else {
  inspectScript({ scriptDocs, scriptKey: cmd })
}
