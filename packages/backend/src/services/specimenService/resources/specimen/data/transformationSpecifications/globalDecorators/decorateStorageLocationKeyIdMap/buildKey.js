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
  storageLevel1,
  storageLevel2,
  storageLevel3,
  storageLevel4,
  storageLevel5,
  storageLocation,
}) {
  let segments = []
  if (parents) {
    segments = [
      ...parents.map(parent => {
        return parent.attributes.name
      }),
      storageLocation.attributes.name,
    ]
  } else {
    segments = [
      storageLevel1,
      storageLevel2,
      storageLevel3,
      storageLevel4,
      storageLevel5,
    ]
  }

  return internalBuildKey(segments)
}
