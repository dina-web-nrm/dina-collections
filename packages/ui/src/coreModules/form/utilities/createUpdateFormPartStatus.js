import immutable from 'object-path-immutable'

const createUpdateFormPartStatus = ({ propName, name, callback }) => ({
  prevState,
  childName,
  value,
}) => {
  if (value === prevState[propName]) {
    return immutable.set(
      prevState,
      `childStatuses.${childName}.${propName}`,
      value
    )
  }

  if (value) {
    if (callback) {
      callback(name, true)
    }

    return immutable.set(
      { ...prevState, [propName]: true },
      `childStatuses.${childName}.${propName}`,
      value
    )
  }

  const otherChildHasTrue = Object.keys(prevState.childStatuses).reduce(
    (flag, key) => {
      if (flag || key === childName) {
        return flag
      }

      return prevState.childStatuses[key][propName]
    },
    false
  )

  if (!otherChildHasTrue) {
    if (callback) {
      callback(name, false)
    }

    return immutable.set(
      { ...prevState, [propName]: false },
      `childStatuses.${childName}.${propName}`,
      value
    )
  }

  return immutable.set(
    prevState,
    `childStatuses.${childName}.${propName}`,
    value
  )
}

export default createUpdateFormPartStatus
