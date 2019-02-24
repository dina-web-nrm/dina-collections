const fs = require('fs')
const getScriptsInGroupAsArray = require('./getScriptsInGroupAsArray')
const getScriptGroups = require('./getScriptGroups')

const createScriptTag = content => {
  return `\`\`\`${content}\`\`\``
}

function writeMarkdown({ markdown, options }) {
  fs.writeFileSync(options.outputPath, markdown)
}

function createMarkdownTable({ headers, array, title }) {
  const tableHeader = headers
    .map(({ text }) => {
      return text
    })
    .join(' | ')

  const tableContent = array
    .map(item => {
      return headers
        .map(({ key }) => {
          return item[key]
        })
        .join(' | ')
    })
    .join('\n')

  const delimiter = headers
    .map(() => {
      return '---------'
    })
    .join(' | ')
  return [`### ${title}`, tableHeader, delimiter, tableContent].join('\n')
}

function buildMarkdownToc({ scriptDocs }) {
  const groups = getScriptGroups({ scriptDocs })

  return groups
    .map(groupName => {
      const groupContent = getScriptsInGroupAsArray({ groupName, scriptDocs })
        .map(({ scriptKey, scriptLink }) => {
          return `* [${scriptKey}](#${scriptLink})`
        })
        .join('\n')

      return [`## ${groupName}`, `${groupContent}`].join('\n')
    })
    .join('\n\n')
}

function buildMarkdownContent({ scriptDocs }) {
  const groupsInput = scriptDocs.groups || []
  const groups = [...groupsInput, 'other']
  return groups
    .map(groupName => {
      const groupContent = getScriptsInGroupAsArray({ groupName, scriptDocs })
        .map(scriptDoc => {
          const {
            args,
            description,
            examples,
            scriptKey,
            scriptLink,
            short,
            usage,
          } = scriptDoc

          return [
            `<a name="${scriptLink}" />`,
            scriptKey && `### ${scriptKey}`,
            short && `${short}`,
            usage && `${createScriptTag(usage)}`,
            description && `#### Description \n ${description}`,
            args &&
              Object.keys(args).length &&
              createMarkdownTable({
                array: Object.keys(args).map(flag => {
                  return {
                    description: args[flag],
                    flag,
                  }
                }),
                headers: [
                  { key: 'flag', text: 'Flag' },
                  { key: 'description', text: 'Description' },
                ],
                title: 'Args',
              }),
            examples &&
              Object.keys(examples).length &&
              createMarkdownTable({
                array: Object.keys(examples).map(example => {
                  return {
                    description: examples[example],
                    example,
                  }
                }),
                headers: [
                  { key: 'example', text: 'Example' },
                  { key: 'description', text: 'Description' },
                ],
                title: 'Examples',
              }),
          ]
            .filter(Boolean)
            .join('\n\n')
        })
        .join('\n')

      return [`## ${groupName}`, `${groupContent}`].join('\n')
    })
    .join('\n')
}

module.exports = function buildMarkdown({ scriptDocs, options }) {
  // const scriptKeys = Object.keys(scriptDocs.scripts)
  // const groupsInput = scriptKeys.groups || []
  // const groups = [...groupsInput, 'other']

  const tableOfContent = buildMarkdownToc({ scriptDocs })
  const content = buildMarkdownContent({ scriptDocs })
  const markdown = ['# Scripts', tableOfContent, content].join('\n\n')
  writeMarkdown({ markdown, options })
}
