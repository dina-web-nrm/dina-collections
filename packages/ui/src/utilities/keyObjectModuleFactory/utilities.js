export const getCleanKey = (key = '') => {
  return key.replace(/:/g, '')
}

export const getActionTypeFromKey = (key = '') => {
  return getCleanKey(key)
    .toUpperCase()
    .replace(/\./g, '_')
}

export const createActionType = ({ actionPrefix, actionVerb, key }) => {
  return `${actionPrefix}_${actionVerb}_${getActionTypeFromKey(key)}`
}

export const isParameterKey = (key = '') => {
  return key.indexOf(':') > -1
}

export const getParametersFromKey = (key = '') => {
  return key.split('.').reduce((parameters, subKey) => {
    if (isParameterKey(subKey)) {
      const cleanKey = getCleanKey(subKey)
      return [...parameters, cleanKey]
    }
    return parameters
  }, [])
}
