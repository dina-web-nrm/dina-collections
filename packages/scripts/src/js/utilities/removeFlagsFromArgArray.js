const removeFlagFromArgArray = ({ args: inputArgs, flag }) => {
  const args = [...inputArgs]
  let serverArgPosition
  args.forEach((arg, index) => {
    if (arg === flag) {
      serverArgPosition = index
    }
  })

  args.splice()

  if (serverArgPosition === undefined) {
    return inputArgs
  }

  return args.filter((_, index) => {
    return index !== serverArgPosition && index !== serverArgPosition + 1
  })
}

module.exports = function removeFlagsFromArgArray({
  args: inputArgs,
  flags = [],
}) {
  let args = inputArgs
  flags.forEach(flag => {
    args = removeFlagFromArgArray({
      args,
      flag,
    })
  })
  return args
}
