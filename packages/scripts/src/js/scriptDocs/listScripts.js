const getScriptsInGroupAsArray = require('./getScriptsInGroupAsArray')
const getScriptGroups = require('./getScriptGroups')

module.exports = function listScripts({ options }) {
  const { scriptDocs } = options
  const groups = getScriptGroups({ scriptDocs })
  console.log(['', 'Listing available scripts', ''].join('\n'))
  groups.forEach(groupName => {
    const groupScripts = getScriptsInGroupAsArray({
      groupName,
      scriptDocs,
    })
    console.table(
      groupName,
      groupScripts.map(script => {
        return {
          script: script.scriptKey,
          short: script.short,
        }
      })
    )
  })

  console.log(
    [
      '',
      'To inspect specific script run: yarn cli:docs <SCRIPT_NAME>',
      '',
    ].join('\n')
  )
}
