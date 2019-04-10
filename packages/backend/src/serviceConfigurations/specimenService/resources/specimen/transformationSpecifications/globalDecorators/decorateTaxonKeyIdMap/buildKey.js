module.exports = function buildKey({ name, rank }) {
  if (!(rank && name)) {
    return null
  }

  return [
    rank
      .trim()
      .toLowerCase()
      .split('.')
      .join(','),
    name
      .trim()
      .toLowerCase()
      .split('.')
      .join(','),
  ].join('->')
}
