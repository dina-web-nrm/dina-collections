const createDeleteProperties = valueToDelete => obj => {
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  const shallowCopy = { ...obj }

  Object.keys(shallowCopy).forEach(key => {
    if (shallowCopy[key] === valueToDelete) {
      delete shallowCopy[key]
    }
  })
  return shallowCopy
}

module.exports = createDeleteProperties
