const objectPath = require('object-path')

module.exports = function walk({ obj, path = '', segments, func }) {
  if (!segments.length) {
    return func(path)
  }

  const currentSegment = segments[0]
  const arrayPath = [path, currentSegment]
    .filter(segment => !!segment)
    .join('.')

  const array = objectPath.get(obj, arrayPath) || []

  if (!Array.isArray(array)) {
    return func(arrayPath)
  }

  return array.forEach((_, index) => {
    const itemPath = `${arrayPath}.${index}`
    walk({
      func,
      obj,
      path: itemPath,
      segments: segments.slice(1),
    })
  })
}
