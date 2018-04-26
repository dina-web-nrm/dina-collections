const objectPath = require('object-path')
const immutable = require('object-path-immutable')

module.exports = function createMigrator({
  // reporter,
  src: srcInput,
  target: targetInput = {},
}) {
  let state = {
    src: srcInput,
    target: targetInput,
  }

  const isPathValid = path => {
    const segments = path.split('.')
    if (segments.length === 0) {
      return false
    }

    return ['src', 'target'].includes(segments[0])
  }

  const isValueDefined = value => {
    return value !== undefined
  }

  const isConditionFulfilled = condition => {
    return condition === undefined || condition
  }

  const setValue = ({ condition, format, path, value }) => {
    if (!isPathValid(path)) {
      return
    }

    if (!isValueDefined(value)) {
      return
    }

    if (!isConditionFulfilled(condition)) {
      return
    }

    let formattedValue = value
    if (format === 'string') {
      formattedValue = `${formattedValue}`
    }
    if (format === 'number') {
      formattedValue = Number(formattedValue)
    }

    state = immutable.set(state, path, formattedValue)
  }

  const pushValueToArray = ({ condition, format, path, value }) => {
    if (!isPathValid(path)) {
      return
    }

    if (!isValueDefined(value)) {
      return
    }

    if (!isConditionFulfilled(condition)) {
      return
    }

    let formattedValue = value
    if (format === 'string') {
      formattedValue = `${formattedValue}`
    }
    if (format === 'number') {
      formattedValue = Number(formattedValue)
    }

    state = immutable.push(state, path, formattedValue)
  }

  const getValue = ({ path, strip = true }) => {
    if (!isPathValid(path)) {
      return undefined
    }
    const value = objectPath.get(state, path)
    if (isValueDefined(value) && strip) {
      state = immutable.del(state, path)
    }
    return value
  }

  const migrateValue = ({
    condition,
    format,
    fromPath,
    strip = true,
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
      path: fromPath,
      strip,
    })

    if (!isValueDefined(value)) {
      return
    }

    setValue({
      format,
      path: toPath,
      value,
    })
  }

  const filterArray = ({ path }) => {
    const array = getValue({ path })
    if (!isValueDefined(array)) {
      return
    }

    const value = array.filter(item => {
      return !!item
    })
    setValue({ path, value })
  }

  const valueExist = ({ path }) => {
    if (!isPathValid(path)) {
      return undefined
    }
    return getValue({ path, strip: false }) !== undefined
  }

  const getState = () => {
    return state
  }

  const getSrc = () => {
    return getState().src
  }

  const getTarget = () => {
    return getState().target
  }

  return {
    filterArray,
    getSrc,
    getState,
    getTarget,
    getValue,
    migrateValue,
    pushValueToArray,
    setValue,
    valueExist,
  }
}
