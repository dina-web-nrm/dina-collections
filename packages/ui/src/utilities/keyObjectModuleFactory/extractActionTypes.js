export default function createActionCreators({ keySpecifications }) {
  const actionCreators = {}
  Object.keys(keySpecifications).forEach(key => {
    Object.keys(keySpecifications[key]).forEach(innerKey => {
      const { actionType } = keySpecifications[key][innerKey]
      actionCreators[actionType] = actionType
    })
  })
  return actionCreators
}
