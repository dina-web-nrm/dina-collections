module.exports = function captureScriptName() {
  const scriptName = process.argv[2] || ''
  if (!(scriptName.indexOf('.sh') > -1)) {
    throw new Error(
      `First argument has to be script name and only .sh scripts allowed. Got ${scriptName}`
    )
  }
  return scriptName
}
