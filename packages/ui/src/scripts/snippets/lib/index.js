/* eslint-disable no-console */
const constants = require('./constants')

const readAllTemplates = require('./utilities/readAllTemplates')
const validateConfig = require('./utilities/validateConfig')
const attachCustomTriggers = require('./utilities/attachCustomTriggers')

const createSublimeSnippets = require('./adaptors/sublime')
const createVsCodeSnippets = require('./adaptors/vsCode')

module.exports = config => {
  validateConfig(config)

  const templatesDefinitions = attachCustomTriggers(
    config,
    readAllTemplates(config.templatePath)
  )

  switch (config.editor) {
    case constants.EDITOR_VS_CODE: {
      return createVsCodeSnippets(config, templatesDefinitions)
    }
    case constants.EDITOR_SUBLIME: {
      return createSublimeSnippets(config, templatesDefinitions)
    }
    default: {
      throw new Error(`Unknown editor ${config.editor}`)
    }
  }
}
