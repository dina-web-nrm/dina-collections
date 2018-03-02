module.exports = function expressifyPath(pathname) {
  // TODO - fix with resonable regex :)
  return pathname
    .replace('{', ':')
    .replace('}', '')
    .replace('{', ':')
    .replace('}', '')
}
