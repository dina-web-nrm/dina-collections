module.exports = function getScriptsInGroupAsArray({ groupName, scriptDocs }) {
  return Object.keys(scriptDocs.scripts)
    .map(key => {
      const scriptDoc = scriptDocs.scripts[key]
      const usage = scriptDoc.usage || `yarn ${key}`
      return {
        scriptKey: key,
        scriptLink: key.split(':').join('-'),
        ...scriptDoc,
        usage,
      }
    })
    .filter(script => {
      if (!groupName) {
        return true
      }
      const scriptGroup = script.group
      if (groupName === 'other' && !scriptGroup) {
        return true
      }
      return groupName === scriptGroup
    })
}
