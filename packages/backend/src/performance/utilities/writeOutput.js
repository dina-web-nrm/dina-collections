const fs = require('fs')
const path = require('path')

const outputBasePath = path.join(__dirname, '../output')

module.exports = function writeOutput(key, data) {
  const filePath = path.join(outputBasePath, `${key}.json`)
  return fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}
