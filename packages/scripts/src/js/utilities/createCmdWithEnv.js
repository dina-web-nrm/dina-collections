module.exports = function createCmdWithEnv({
  cmd: cmdInput,
  delimiterPrefix = '#',
  delimiterSufix = '#',
  envMap = {},
}) {
  let cmd = cmdInput

  Object.keys(envMap).forEach(key => {
    const replaceString = `${delimiterPrefix}${key}${delimiterSufix}`
    if (cmd.indexOf(replaceString) > -1) {
      cmd = cmd.replace(replaceString, `${key}=${envMap[key]}`)
    }
  })
  return cmd
}
