module.exports = function expressifyPath(pathname) {
  return pathname.replace(/{/g, ':').replace(/}/g, '')
}
