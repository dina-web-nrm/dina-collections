const fs = require('fs')
const path = require('path')

const readParameterFromMarkdownFile = require('./readParameterFromMarkdownFile')

/*
* Some magic going on here. Should be divided into differet functions
*
*/
module.exports = function readParameterFromJsonFile({
  basePath,
  parameterName,
  includeProperties = false,
  modelType,
  markdownFiles = ['description'],
}) {
  let parameterJsonPath = path.join(basePath, `${parameterName}.json`)
  if (fs.existsSync(parameterJsonPath)) {
    const res = require(parameterJsonPath)
    if (modelType) {
      return {
        ...res,
        modelType,
      }
    }

    return res
  }

  const parameterJsonFolderPath = path.join(basePath, `${parameterName}`)

  if (
    fs.existsSync(parameterJsonFolderPath) &&
    fs.statSync(parameterJsonFolderPath).isDirectory()
  ) {
    parameterJsonPath = path.join(parameterJsonFolderPath, 'index.json')
    if (fs.existsSync(parameterJsonPath)) {
      let json = require(parameterJsonPath)
      if (modelType) {
        json = {
          ...json,
          modelType,
        }
      }
      markdownFiles.forEach(markdownFile => {
        const markdownFileContent = readParameterFromMarkdownFile(
          parameterJsonFolderPath,
          markdownFile
        )

        if (markdownFileContent) {
          json = {
            ...json,
            [markdownFile]: markdownFileContent,
          }
        }
      })

      if (includeProperties) {
        const fileNames = fs
          .readdirSync(parameterJsonFolderPath)
          .filter(fileName => {
            return !['index.json', 'description.md', 'example.json'].includes(
              fileName
            )
          })

        const extraProperties = fileNames.reduce((properties, fileName) => {
          const property = readParameterFromJsonFile({
            basePath: parameterJsonFolderPath,
            parameterName: fileName,
          })
          return {
            ...properties,
            [fileName]: property,
          }
        }, {})

        const currentProperties = json.properties || {}
        json = {
          ...json,
          properties: {
            ...currentProperties,
            ...extraProperties,
          },
        }
      }

      const example = readParameterFromJsonFile({
        basePath: parameterJsonFolderPath,
        parameterName: 'example',
      })
      if (example) {
        json = {
          ...json,
          example,
        }
      }

      return json
    }
  }

  return null
}
