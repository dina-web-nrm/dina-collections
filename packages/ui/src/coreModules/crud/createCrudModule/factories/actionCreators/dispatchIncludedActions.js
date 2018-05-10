const groupIncluded = included => {
  const typeMap = {}
  included.forEach(item => {
    const { type } = item
    typeMap[type] = typeMap[type] ? [...typeMap[type], item] : [item]
  })
  return typeMap
}

export default function dispatchIncludedActions({
  actionTypes,
  dispatch,
  included,
}) {
  const typeMap = groupIncluded(included)
  Object.keys(typeMap).forEach(type => {
    const items = typeMap[type]
    const actionType = actionTypes[type] && actionTypes[type].setIncluded
    if (!actionType) {
      console.warn(`included type: ${type} not defined in crud module`)
    } else {
      dispatch({
        payload: items,
        type: actionType,
      })
    }
  })
}
