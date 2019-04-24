const path = require('path')
const fs = require('fs')
const markdownTable = require('markdown-table')

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return true
  }
  ensureDirectoryExistence(dirname)
  return fs.mkdirSync(dirname)
}

module.exports = function writeTestLog({
  headers,
  name,
  group,
  testLogObject,
}) {
  if (!process.env.WRITE_TEST_RESULT) {
    return
  }
  if (!name) {
    throw new Error('Provide name')
  }

  if (!group) {
    throw new Error('Provide group')
  }

  const filePath = `${group}/${name}.md`
  const targetPath = path.join(
    __dirname,
    '../../../testDocumentation',
    filePath
  )
  ensureDirectoryExistence(targetPath)
  let markdown = `# Tests for ${group}`
  if (name === 'unit') {
    markdown = `${markdown}\n\n Note that | is escaped in regexp to be displayed correct in github markdown`
  }

  Object.keys(testLogObject).forEach(key => {
    const logItems = [headers, ...testLogObject[key]]
    markdown = `${markdown}\n\n## ${key}\n\n${markdownTable(logItems)}`
  })

  fs.writeFileSync(targetPath, markdown)
}
