const getScriptsInGroupAsArray = require('./getScriptsInGroupAsArray')
const getScriptGroups = require('./getScriptGroups')

module.exports = function listScripts({ scriptDocs }) {
  const groups = getScriptGroups({ scriptDocs })
  console.log(
    [
      '',
      'Listing available scripts',
      'To get detailed information run yarn docs [scriptname]',
      '',
    ].join('\n')
  )
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
}
