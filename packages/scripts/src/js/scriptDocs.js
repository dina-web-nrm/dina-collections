require('console.table')
const fs = require('fs')
const path = require('path')
const captureFlagFromArgs = require('./utilities/captureFlagFromArgs')

const cmd = process.argv[2]
function buildOptions() {
  const inputPath =
    captureFlagFromArgs({
      flag: '--inputPath',
    }) || path.join(process.cwd(), 'scriptDocs')

  const outputPath =
    captureFlagFromArgs({
      flag: '--outputPath',
    }) || path.join(process.cwd(), 'documentation/scripts.md')

  const build =
    captureFlagFromArgs({
      flag: '--build',
    }) === 'true' || false

  const test =
    captureFlagFromArgs({
      flag: '--test',
    }) === 'true' || false

  const packageJsonPath = path.join(process.cwd(), 'package.json')

  return {
    build,
    inputPath,
    outputPath,
    packageJsonPath,
    test,
  }
}

const options = buildOptions()

const scriptDocs = require(options.inputPath)
const packageJson = require(options.packageJsonPath)

function listScripts() {
  console.log(
    [
      '',
      'Listing available scripts',
      'To get detailed information run yarn docs [scriptname]',
      '',
    ].join('\n')
  )
  console.table(
    Object.keys(scriptDocs.scripts).map(key => {
      return {
        script: key,
        short: scriptDocs.scripts[key].short,
      }
    })
  )
}

function inspectScript(scriptKey) {
  const { usage, short, description, args, examples } = scriptDocs.scripts[
    scriptKey
  ]
  const space = '  '
  console.log(`${scriptKey}\n`)
  console.log(`\Usage: \n${space}${usage}`)
  console.log(`\nShort: \n${space}${short}`)
  console.log(`\nDescription: \n${space}${description}\n`)
  if (examples) {
    console.table(
      'Examples',
      Object.keys(examples).map(exampleCmd => {
        return {
          cmd: exampleCmd,
          description: examples[exampleCmd],
        }
      })
    )
  }

  if (args) {
    console.table(
      'Args',
      Object.keys(args).map(arg => {
        return {
          arg,
          description: args[arg],
        }
      })
    )
  }
}

const createScriptTag = content => {
  return `\`\`\`${content}\`\`\``
}

function writeMarkdown(content) {
  fs.writeFileSync(options.outputPath, content)
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

function test() {
  const scriptsInPackageJson =
    packageJson && packageJson.scripts && Object.keys(packageJson.scripts)
  const scriptsInScriptDocs =
    scriptDocs && scriptDocs.scripts && Object.keys(scriptDocs.scripts)

  const scriptsMissingInScriptDocs = []
  if (scriptsInPackageJson) {
    scriptsInPackageJson.forEach(scriptKey => {
      if (!scriptsInScriptDocs.includes(scriptKey)) {
        scriptsMissingInScriptDocs.push(scriptKey)
      }
    })
  }

  const scriptMissingInPackageJson = []
  if (scriptsInScriptDocs) {
    scriptsInScriptDocs.forEach(scriptKey => {
      if (!scriptsInPackageJson.includes(scriptKey)) {
        scriptMissingInPackageJson.push(scriptKey)
      }
    })
  }

  if (scriptsMissingInScriptDocs.length) {
    console.log(
      `The following scripts are missing from scriptDocs \n${scriptsMissingInScriptDocs
        .map(str => {
          return `  ${str}`
        })
        .join('\n')}`
    )

    process.exit(1)
  }
  if (scriptMissingInPackageJson.length) {
    console.log(
      `The following scripts exist in scriptDocs but not in package.json \n${scriptMissingInPackageJson
        .map(str => {
          return `  ${str}`
        })
        .join('\n')}`
    )

    process.exit(1)
  }
}

function buildMarkdown() {
  const scriptKeys = Object.keys(scriptDocs.scripts)
  const tableOfContent = `# Scripts\n\n${scriptKeys
    .map((scriptKey, index) => {
      return `${index + 1}. [${scriptKey}](#${scriptKey})`
    })
    .join('\n')}`

  // | First Header | Second Header |
  // | ------------- | ------------- |
  // | Content Cell | Content Cell |
  // | Content Cell | Content Cell |

  const content = scriptKeys
    .map(scriptKey => {
      const { usage, short, description, args, examples } = scriptDocs.scripts[
        scriptKey
      ]

      return [
        `<a name="${scriptKey}" />`,
        scriptKey && `## ${scriptKey}`,
        short && `${short}`,
        usage && `${createScriptTag(usage)}`,
        description && `### Description \n ${description}`,
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
    .join('\n\n')

  const markdown = [tableOfContent, content].join('\n\n')
  writeMarkdown(markdown)
  // console.log(markdown)
}
if (options.test) {
  test()
} else if (options.build) {
  buildMarkdown()
} else if (cmd === 'ls') {
  listScripts()
} else if (!scriptDocs.scripts[cmd]) {
  console.log(`Unknown script: ${cmd}`)
} else {
  inspectScript(cmd)
}
