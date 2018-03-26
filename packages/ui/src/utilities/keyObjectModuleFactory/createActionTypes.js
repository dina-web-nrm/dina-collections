export default function createActionCreators({ keyMap }) {
  const actionCreators = {}
  Object.keys(keyMap).forEach(key => {
    Object.keys(keyMap[key]).forEach(innerKey => {
      const { actionType } = keyMap[key][innerKey]
      actionCreators[actionType] = actionType
    })
  })
  return actionCreators
}
