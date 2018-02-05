const path = require('path')
const watchGlob = require('watch-glob')

const writeRenderedMarkdownFile = require('./writeRenderedMarkdownFile')

const rootPath = path.join(__dirname, '../', '../')
const directoryEnding = '__markdown__'

watchGlob(
  `**/${directoryEnding}/**/*.md`,
  { callbackArg: 'absolute', cwd: rootPath },
  filePath => {
    const directoryPath = filePath.slice(
      0,
      filePath.indexOf(directoryEnding) + directoryEnding.length
    )
    writeRenderedMarkdownFile(directoryPath)
  }
)
