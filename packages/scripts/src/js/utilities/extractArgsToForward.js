const removeScriptFromArgArray = ({ args }) => {
  return args.filter(arg => {
    return !arg.endsWith('.sh')
  })
}

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

module.exports = function extractArgsToForward({
  args: inputArgs,
  removeFlags = [],
  removeScript = true,
}) {
  let args = inputArgs
  removeFlags.forEach(flag => {
    args = removeFlagFromArgArray({
      args,
      flag,
      removeScript,
    })
  })
  if (removeScript) {
    return removeScriptFromArgArray({ args })
  }
  return args
}
