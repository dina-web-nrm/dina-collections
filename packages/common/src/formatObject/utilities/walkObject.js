const objectPath = require('object-path')
const getNextWalkPath = require('./getNextWalkPath')

module.exports = function walkObject({ obj, path = '', segments = [], func }) {
  if (!obj) {
    throw new Error('must provide object')
  }

  if (!func) {
    throw new Error('must provide func')
  }

  if (!segments.length) {
    func(path)
  } else {
    const nextPath = getNextWalkPath({ path, segments })
    const valueAtNextPath = objectPath.get(obj, nextPath)

    if (valueAtNextPath) {
      if (Array.isArray(valueAtNextPath)) {
        valueAtNextPath.forEach((_, index) => {
          const elementPath = `${nextPath}.${index}`
          walkObject({
            func,
            obj,
            path: elementPath,
            segments: segments.slice(1),
          })
        })
      } else {
        func(nextPath)
      }
    }
  }
}
