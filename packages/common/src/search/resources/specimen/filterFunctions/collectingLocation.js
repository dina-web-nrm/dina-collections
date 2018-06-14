module.exports = ({ item, input }) => {
  const { value } = input

  const collectingLocation =
    item.attributes && item.attributes.collectingLocation
  if (!collectingLocation) {
    return false
  }

  if (collectingLocation.place) {
    if (collectingLocation.place.indexOf(value) === 0) {
      return true
    }
  }

  if (collectingLocation.collectingLocationN) {
    if (collectingLocation.collectingLocationN.indexOf(value) === 0) {
      return true
    }
  }

  if (collectingLocation.collectingLocationT) {
    if (collectingLocation.collectingLocationT.indexOf(value) === 0) {
      return true
    }
  }

  return false
}
