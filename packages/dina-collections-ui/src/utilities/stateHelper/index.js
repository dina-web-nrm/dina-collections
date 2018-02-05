import immutable from 'object-path-immutable'
import objectPath from 'object-path'

export const buildPath = (segments = [], pathArguments = {}) => {
  return segments
    .reduce((arr, segment) => {
      if (segment && segment.length && segment[0] === ':') {
        if (segment.length > 1 && segment[1] === ':') {
          const parameter = segment.slice(2)
          if (pathArguments[parameter] === undefined) {
            throw new Error(
              `Parameter ${parameter} missing for segments: [${segments.join(
                ', '
              )}]`
            )
          }
          return [...arr, pathArguments[parameter].split('.').join('-')]
        }
        const parameter = segment.slice(1)
        if (pathArguments[parameter] === undefined) {
          throw new Error(
            `Parameter ${parameter} missing for segments: [${segments.join(
              ', '
            )}]`
          )
        }

        return [...arr, pathArguments[parameter]]
      }
      return [...arr, segment]
    }, [])
    .filter(arg => arg !== undefined && arg !== null && arg !== '')
    .join('.')
}

export const createGetter = segments => {
  return function get(obj, pathArguments) {
    const path = buildPath(segments, pathArguments)
    return objectPath.get(obj, path)
  }
}

export const createSetter = segments => {
  return function set(obj, arg1, arg2) {
    const path =
      arg2 !== undefined ? buildPath(segments, arg1) : buildPath(segments, {})
    return immutable.set(obj, path, arg2 !== undefined ? arg2 : arg1)
  }
}

export const createDeleter = segments => {
  return function del(obj, pathArguments) {
    const path = buildPath(segments, pathArguments)
    let res = immutable.del(obj, path)
    const iterpolatedSegments = path.split('.')

    while (iterpolatedSegments.length) {
      iterpolatedSegments.pop()
      const newSubpath = iterpolatedSegments.join('.')
      const subResult = objectPath.get(res, newSubpath)
      if (subResult && Object.keys(subResult).length === 0) {
        res = immutable.del(obj, newSubpath)
      } else {
        break
      }
    }
    return res
  }
}
