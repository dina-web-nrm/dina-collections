module.exports = function incrementNumber(prevNumber) {
  if (!prevNumber) {
    return 1
  }

  if (prevNumber === 9999) {
    throw new Error('Catalog number limit reached')
  }

  return prevNumber + 1
}
