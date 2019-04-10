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
  room,
  mountingWall,
  storageLevel3,
  shelf,
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
    segments = [room, mountingWall, storageLevel3, shelf, storageLevel5]
  }

  return internalBuildKey(segments)
}
