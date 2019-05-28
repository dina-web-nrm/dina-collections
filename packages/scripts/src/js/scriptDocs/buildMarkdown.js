const fs = require('fs')
const getScriptsInGroupAsArray = require('./getScriptsInGroupAsArray')
const getScriptGroups = require('./getScriptGroups')

const createScriptTag = content => {
  return `\`${content}\``
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
  return [`#### ${title}`, tableHeader, delimiter, tableContent].join('\n')
}

function buildMarkdownToc({ scriptDocs }) {
  const groups = getScriptGroups({ scriptDocs })

  const toc = groups
    .map(groupName => {
      const groupContent = getScriptsInGroupAsArray({ groupName, scriptDocs })
        .map(({ scriptKey, scriptLink }) => {
          return `* [${scriptKey}](#${scriptLink})`
        })
        .join('\n')

      return [`**${groupName}**`, `${groupContent}`].join('\n')
    })
    .join('\n\n')
  return `## TOC\n\n${toc}`
}

function buildMarkdownContent({ packageJson, scriptDocs }) {
  const groupsInput = scriptDocs.groups || []
  const groups = [...groupsInput, 'other']
  return groups
    .map(groupName => {
      const groupContent = getScriptsInGroupAsArray({ groupName, scriptDocs })
        .map(scriptDoc => {
          const {
            args,
            description,
            env,
            examples,
            scriptKey,
            scriptLink,
            short,
            usage,
          } = scriptDoc

          const {
            scripts: { [scriptKey]: packageScript },
          } = packageJson

          if (!short) {
            console.log(`Missing short for: ${scriptKey}`)
          }

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
            env &&
              Object.keys(env).length &&
              createMarkdownTable({
                array: Object.keys(env).map(envKey => {
                  return {
                    description: env[envKey],
                    envKey,
                  }
                }),
                headers: [
                  { key: 'envKey', text: 'Env variable' },
                  { key: 'description', text: 'Description' },
                ],
                title: 'ENV',
              }),
            examples &&
              Object.keys(examples).length &&
              createMarkdownTable({
                array: Object.keys(examples).map(example => {
                  return {
                    description: examples[example],
                    example: `\`${example}\``,
                  }
                }),
                headers: [
                  { key: 'example', text: 'Example' },
                  { key: 'description', text: 'Description' },
                ],
                title: 'Examples',
              }),
            packageScript && `#### src\n\`\`\`bash\n${packageScript}\n\`\`\``,
          ]
            .filter(Boolean)
            .join('\n\n\n')
        })
        .join('\n')

      const groupDescription =
        scriptDocs.groupDescriptions && scriptDocs.groupDescriptions[groupName]

      return [`## ${groupName} scripts`, groupDescription, groupContent]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n')
}

module.exports = function buildMarkdown({ options, packageJson }) {
  const { scriptDocs } = options
  const { meta: { preamble } = {} } = scriptDocs
  const tableOfContent = buildMarkdownToc({ scriptDocs })
  const content = buildMarkdownContent({ packageJson, scriptDocs })
  const markdown = [preamble, tableOfContent, content]
    .filter(Boolean)

    .join('\n\n')
  writeMarkdown({ markdown, options })
}
