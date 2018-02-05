/* eslint-disable no-console */
const fs = require('fs')

const createVsCodeSnippet = (config, templateDefinition) => {
  const { prefix } = config
  const {
    content,
    customTrigger,
    name,
    trigger: defaultTrigger,
  } = templateDefinition
  const trigger = customTrigger || defaultTrigger

  return {
    body: content.split('\n'),
    description: name,
    prefix: prefix ? `${prefix}${trigger}` : trigger,
  }
}

const createSnippetDefinitions = (config, templatesDefinitions) => {
  return templatesDefinitions.reduce((snippetObject, templateDefinition) => {
    /* eslint-disable no-param-reassign */

    snippetObject[templateDefinition.name] = createVsCodeSnippet(
      config,
      templateDefinition
    )
    /* eslint-endable no-param-reassign */
    return snippetObject
  }, {})
}

const writeSnippets = (config, snippetDefinitions) => {
  const outputFilePath = config.snippetOutputPath
  console.log(`Writing snippets to path: ${outputFilePath}`)
  fs.writeFileSync(outputFilePath, JSON.stringify(snippetDefinitions, null, 2))
}

module.exports = (config, templatesDefinitions) => {
  const snippetDefinitions = createSnippetDefinitions(
    config,
    templatesDefinitions
  )
  writeSnippets(config, snippetDefinitions)
}
