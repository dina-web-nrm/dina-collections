const deleteNullProperties = obj => {
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  const shallowCopy = { ...obj }

  Object.keys(shallowCopy).forEach(key => {
    if (shallowCopy[key] === null) {
      delete shallowCopy[key]
    }
  })

  return shallowCopy
}

module.exports = deleteNullProperties
