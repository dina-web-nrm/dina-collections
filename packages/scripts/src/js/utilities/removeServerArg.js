module.exports = function removeServerArgs(inputArgs) {
  const args = [...inputArgs]
  let serverArgPosition
  args.forEach((arg, index) => {
    if (arg === '-s') {
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
