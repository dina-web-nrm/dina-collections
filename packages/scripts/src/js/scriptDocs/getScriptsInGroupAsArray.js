module.exports = function getScriptsInGroupAsArray({ groupName, scriptDocs }) {
  return Object.keys(scriptDocs.scripts)
    .map(key => {
      return {
        scriptKey: key,
        scriptLink: key.split(':').join('-'),
        ...scriptDocs.scripts[key],
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
