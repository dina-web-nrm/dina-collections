const capitalizeFirstLetter = require('common/src/stringFormatters/capitalizeFirstLetter')

const path = require('path')
const fs = require('fs')
const markdownTable = require('markdown-table')

module.exports = function writeTestLog({
  headers,
  resource,
  testLogObject,
  type = 'unit',
}) {
  const testFileName = `${resource}${capitalizeFirstLetter(type)}.md`
  const targetPath = path.join(__dirname, '../../../testOverview', testFileName)

  let markdown = `# Unit tests for ${resource}`

  Object.keys(testLogObject).forEach(key => {
    const logItems = [headers, ...testLogObject[key]]
    markdown = `${markdown}\n\n## ${key}\n\n${markdownTable(logItems)}`
  })

  fs.writeFileSync(targetPath, markdown)
}
