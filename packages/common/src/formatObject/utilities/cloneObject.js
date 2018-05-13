module.exports = function cloneObject(object) {
  return JSON.parse(JSON.stringify(object))
}
