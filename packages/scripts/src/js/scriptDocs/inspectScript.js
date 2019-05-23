module.exports = function inspectScript({ options, scriptKey }) {
  const { scriptDocs } = options
  if (!scriptDocs.scripts[scriptKey]) {
    console.log(`Unknown script: ${scriptKey}`)
    process.exit(1)
  }

  const {
    usage = `yarn ${scriptKey}`,
    short,
    description,
    args,
    examples,
  } = scriptDocs.scripts[scriptKey]
  const space = '  '
  console.log(`\nUsage: \n${space}${usage}`)
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
