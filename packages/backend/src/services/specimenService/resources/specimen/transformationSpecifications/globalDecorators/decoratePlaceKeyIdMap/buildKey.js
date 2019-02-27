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
  district,
}) {
  let segments = []
  if (parents) {
    segments = [
      ...parents.map(parent => {
        return `${parent.attributes.name} (${parent.attributes.group})`
      }),
      `${place.attributes.name} (${place.attributes.group})`,
    ]
  } else {
    if (continent) {
      segments.push(`${continent} (continent-ocean)`)
    }
    if (nation) {
      segments.push(`${nation} (country)`)
    }
    if (province) {
      segments.push(`${province} (province)`)
    }
    if (district) {
      segments.push(`${district} (district)`)
    }
  }

  return internalBuildKey(segments)
}
