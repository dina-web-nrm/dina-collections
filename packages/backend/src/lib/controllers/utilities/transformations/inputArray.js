const inputObject = require('./inputObject')

module.exports = function inputArray({ items, relations, sourceResource }) {
  return items.map(item => {
    return inputObject({
      input: item,
      relations,
      sourceResource,
    }).item
  })
}
