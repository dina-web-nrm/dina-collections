module.exports = function captureServerNameFromArg() {
  const inputArgs = process.argv.slice(2)
  let serverName = ''
  inputArgs.forEach((arg, index) => {
    const serverNameIndex = index + 1
    if (arg === '-s' && serverNameIndex < inputArgs.length) {
      serverName = inputArgs[serverNameIndex]
    }
  })

  return serverName
}
