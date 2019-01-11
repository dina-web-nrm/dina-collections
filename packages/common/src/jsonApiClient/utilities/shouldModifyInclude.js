module.exports = function shouldModifyInclude({
  resourcePath,
  includesToModify = [],
}) {
  return includesToModify.some(str => {
    return str.includes(resourcePath)
  })
}
