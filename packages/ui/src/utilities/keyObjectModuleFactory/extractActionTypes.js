export default function extractActionTypes({ keySpecifications }) {
  const actionTypes = {}
  Object.keys(keySpecifications).forEach(key => {
    Object.keys(keySpecifications[key]).forEach(innerKey => {
      const { actionType } = keySpecifications[key][innerKey]
      actionTypes[actionType] = actionType
      actionTypes[key] = actionTypes[key] || {}
      actionTypes[key][innerKey] = actionType
    })
  })
  return actionTypes
}
