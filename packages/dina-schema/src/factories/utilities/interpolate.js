module.exports = (object, key, value) => {
  const regex = new RegExp(key, 'g')
  return JSON.parse(JSON.stringify(object).replace(regex, value))
}
