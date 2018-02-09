const fs = require('fs')
const path = require('path')

const readAllTemplates = templatePath => {
  const files = fs.readdirSync(templatePath)
  return files.reduce((templates, fileName) => {
    const fullPath = path.join(templatePath, fileName)
    if (fs.statSync(fullPath).isDirectory()) {
      return templates.concat(readAllTemplates(fullPath))
    }
    const name = fileName.replace('.js', '')
    if (name[0] === '.') {
      return templates
    }
    return templates.concat({
      content: fs.readFileSync(fullPath, 'utf8'),
      fileName,
      fullPath,
      name,
      templatePath,
      trigger: name,
    })
  }, [])
}

module.exports = readAllTemplates
