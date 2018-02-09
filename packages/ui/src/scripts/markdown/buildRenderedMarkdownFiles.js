const glob = require('glob')
const path = require('path')

const writeRenderedMarkdownFile = require('./writeRenderedMarkdownFile')

const rootPath = path.join(__dirname, '../', '../')

glob(path.join(rootPath, '/**/__markdown__/'), (err, files) => {
  if (err) {
    console.log('Error creating markdown imports. Not updating imports', err) // eslint-disable-line no-console
    process.exit(0)
  }

  files.forEach(writeRenderedMarkdownFile)

  process.exit(0)
})
