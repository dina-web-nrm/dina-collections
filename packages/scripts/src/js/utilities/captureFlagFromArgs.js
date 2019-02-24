module.exports = function captureFlagFromArgs({
  flag,
  throwOnMissing = false,
}) {
  const inputArgs = process.argv.slice(2)
  let flagValue = ''
  inputArgs.forEach((arg, index) => {
    if (flag.indexOf('--') === 0) {
      if (arg.indexOf(flag) === 0) {
        const segments = arg.split('=')
        if (segments.length > 1) {
          flagValue = segments[1] // eslint-disable-line
        }
      }
    } else {
      const serverNameIndex = index + 1
      if (arg === flag && serverNameIndex < inputArgs.length) {
        flagValue = inputArgs[serverNameIndex]
      }
    }
  })

  if (!flagValue && throwOnMissing) {
    throw new Error(`Flag: ${flag} not found in args`)
  }

  return flagValue
}
