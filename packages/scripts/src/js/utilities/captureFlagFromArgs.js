module.exports = function captureFlagFromArgs({
  flag,
  throwOnMissing = false,
}) {
  const inputArgs = process.argv.slice(2)
  let flagValue = ''
  inputArgs.forEach((arg, index) => {
    const serverNameIndex = index + 1
    if (arg === flag && serverNameIndex < inputArgs.length) {
      flagValue = inputArgs[serverNameIndex]
    }
  })

  if (!flagValue && throwOnMissing) {
    throw new Error(`Flag: ${flag} not found in args`)
  }

  return flagValue
}
