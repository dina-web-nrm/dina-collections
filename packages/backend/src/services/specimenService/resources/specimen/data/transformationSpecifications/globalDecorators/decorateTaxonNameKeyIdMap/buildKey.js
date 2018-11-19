module.exports = function buildKey({
  taxonName,
  rank: rankInput,
  name: nameInput,
}) {
  const name = taxonName ? taxonName.attributes.name : nameInput
  const rank = taxonName ? taxonName.attributes.rank : rankInput

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
