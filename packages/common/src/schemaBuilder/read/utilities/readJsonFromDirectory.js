const fs = require('fs')
const path = require('path')
const readParameterFromJsonFile = require('./readParameterFromJsonFile')

module.exports = function readJsonFromDirectory({
  directory,
  includeProperties = false,
  modelType,
}) {
  if (!fs.existsSync(directory)) {
    return {}
  }

  return fs.readdirSync(directory).reduce((obj, fileName) => {
    const file = readParameterFromJsonFile({
      basePath: directory,
      includeProperties,
      modelType,
      parameterName: fileName,
    })

    if (file) {
      const { properties } = file
      Object.keys(properties).forEach(property => {
        const propertyDescriptionPath = path.join(
          directory,
          fileName,
          `${property}.md`
        )
        if (
          fs.existsSync(propertyDescriptionPath) &&
          property !== 'description'
        ) {
          properties[property].description = fs.readFileSync(
            propertyDescriptionPath,
            'utf8'
          )
        }
      })

      return {
        ...obj,
        [fileName]: file,
      }
    }
    return obj
  }, {})
}
