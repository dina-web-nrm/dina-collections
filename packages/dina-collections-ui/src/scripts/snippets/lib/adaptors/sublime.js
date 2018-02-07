/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')

const createSublimeSnippet = (config, templateDefinition) => {
  const { prefix } = config
  const { content, customTrigger, trigger: defaultTrigger } = templateDefinition

  const trigger = customTrigger || defaultTrigger
  const prefixedTrigger = prefix ? `${prefix}${trigger}` : trigger
  return `
<snippet>
  <content>
    <![CDATA[${content}]]>
  </content>
  <tabTrigger>${prefixedTrigger}</tabTrigger>
</snippet>
  `
}

const createOutputFilePath = (config, templateDefinition) => {
  const { name } = templateDefinition
  return path.join(config.snippetOutputPath, `${name}.sublime-snippet`)
}

const createSnippetDefinitions = (config, templatesDefinitions) => {
  return templatesDefinitions.map(templateDefinition => {
    /* eslint-disable no-param-reassign */
    templateDefinition.outputFilePath = createOutputFilePath(
      //
      config,
      templateDefinition
    )
    templateDefinition.snippet = createSublimeSnippet(
      config,
      templateDefinition
    )
    /* eslint-endable no-param-reassign */
    return templateDefinition
  })
}

const writeSnippets = snippetDefinitions => {
  snippetDefinitions.forEach(snippetDefinition => {
    const { fileName, outputFilePath, snippet, trigger } = snippetDefinition

    console.log(
      `Writing snippet: ${trigger} from file: ${fileName} to path: ${
        outputFilePath
      }`
    )
    fs.writeFileSync(outputFilePath, snippet)
  })
}

module.exports = (config, templatesDefinitions) => {
  const snippetDefinitions = createSnippetDefinitions(
    config,
    templatesDefinitions
  )
  writeSnippets(snippetDefinitions)
}
