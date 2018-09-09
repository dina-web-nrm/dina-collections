const asyncReduce = require('../asyncReduce')
const objectPath = require('object-path')

const isPathValid = path => {
  const segments = path.split('.')
  if (segments.length === 0) {
    return false
  }

  return true
}

const isValueDefined = value => {
  return value !== undefined
}

const isConditionFulfilled = condition => {
  return condition === undefined || condition
}

const setValue = ({ condition, format, obj, path, value }) => {
  if (!isPathValid(path)) {
    return null
  }

  if (!isValueDefined(value)) {
    return null
  }

  if (!isConditionFulfilled(condition)) {
    return null
  }

  let formattedValue = value
  if (format === 'string') {
    formattedValue = `${formattedValue}`
  }
  if (format === 'number') {
    formattedValue = Number(formattedValue)
  }

  objectPath.set(obj, path, formattedValue)
  return obj
}

const pushValueToArray = ({ obj, condition, format, path, value }) => {
  if (!isPathValid(path)) {
    return null
  }

  if (!isValueDefined(value)) {
    return null
  }

  if (!isConditionFulfilled(condition)) {
    return null
  }

  let formattedValue = value
  if (format === 'string') {
    formattedValue = `${formattedValue}`
  }
  if (format === 'number') {
    formattedValue = Number(formattedValue)
  }

  objectPath.push(obj, path, formattedValue)
  return obj
}

const getValue = ({ clone = false, obj, path, strip = false }) => {
  if (!isPathValid(path)) {
    return undefined
  }
  const value = objectPath.get(obj, path)
  if (isValueDefined(value) && strip) {
    objectPath.del(obj, path)
  }
  if (value && clone) {
    return JSON.parse(JSON.stringify(value))
  }
  return value
}

const migrateValue = ({
  condition,
  format,
  fromPath,
  src,
  strip = false,
  target,
  toPath,
}) => {
  if (!isPathValid(fromPath)) {
    return
  }
  if (!isPathValid(toPath)) {
    return
  }
  if (!isConditionFulfilled(condition)) {
    return
  }

  const value = getValue({
    obj: src,
    path: fromPath,
    strip,
  })

  if (!isValueDefined(value)) {
    return
  }

  setValue({
    format,
    obj: target,
    path: toPath,
    value,
  })
}

const filterArray = ({ obj, path }) => {
  const array = getValue({ obj, path })
  if (!isValueDefined(array)) {
    return
  }

  const value = array.filter(item => {
    return !!item
  })
  setValue({ obj, path, value })
}

const valueExist = ({ obj, path }) => {
  if (!isPathValid(path)) {
    return undefined
  }
  return getValue({ obj, path, strip: false }) !== undefined
}

const applyTransformationFunctions = ({
  item,
  transformationFunctions,
  ...rest
}) => {
  if (!transformationFunctions) {
    throw new Error('No map functions provided')
  }

  const transformationFunctionsArray = Array.isArray(transformationFunctions)
    ? transformationFunctions
    : Object.keys(transformationFunctions).map(key => {
        return transformationFunctions[key]
      })

  const target = {}

  transformationFunctionsArray.forEach(mapFunction => {
    mapFunction({ src: item, target, ...rest })
  })
  return target
}

const applyTransformationFunctionsAsync = ({
  item,
  transformationFunctions,
  ...rest
}) => {
  if (!transformationFunctions) {
    throw new Error('No map functions provided')
  }

  const transformationFunctionsArray = Array.isArray(transformationFunctions)
    ? transformationFunctions
    : Object.keys(transformationFunctions).map(key => {
        return transformationFunctions[key]
      })

  const target = {}
  const locals = {}
  return asyncReduce({
    initialValue: null,
    items: transformationFunctionsArray,
    reduceFunction: ({ item: transformationFunction }) => {
      return Promise.resolve()
        .then(() => {
          return transformationFunction({ locals, src: item, target, ...rest })
        })
        .then(() => {
          return null
        })
        .catch(err => {
          err.scope = transformationFunction.name // eslint-disable-line no-param-reassign
          throw err
        })
    },
  }).then(() => {
    return target
  })
}

module.exports = {
  applyTransformationFunctions,
  applyTransformationFunctionsAsync,
  filterArray,
  getValue,
  migrateValue,
  pushValueToArray,
  setValue,
  valueExist,
}
