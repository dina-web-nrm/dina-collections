const internalBuildKey = segments => {
  return segments
    .filter(group => {
      return !!group
    })
    .map(item => {
      return item
        .trim()
        .split('.')
        .join(',')
    })
    .join('->')
}

module.exports = function buildKey({
  parents,
  place,
  continent,
  nation,
  province,
}) {
  let segments = []
  if (parents) {
    segments = [
      ...parents.map(parent => {
        return parent.attributes.name
      }),
      place.attributes.name,
    ]
  } else {
    segments = [continent, nation, province]
  }

  return internalBuildKey(segments)
}
