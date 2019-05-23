module.exports = function getScriptGroups({ scriptDocs }) {
  const groupsInput = scriptDocs.groups || []
  return [...groupsInput, 'other']
}
