const capitalizeFirstLetter = require('../capitalizeFirstLetter')

module.exports = function capitalizeFirstLetterOfEachWord(string) {
  if (!string) {
    return string
  }

  return string
    .split(' ')
    .map(word => {
      return capitalizeFirstLetter(word)
    })
    .join(' ')
}
