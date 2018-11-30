module.exports = function capitalizeFirstLetterOfEachWord(string) {
  if (!string) {
    return string
  }
  return string
    .split(' ')
    .map(a => a.charAt(0).toUpperCase() + a.slice(1))
    .join(' ')
}
