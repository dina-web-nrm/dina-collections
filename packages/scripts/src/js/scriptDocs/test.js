module.exports = function testFormat({ packageJson, scriptDocs }) {
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
