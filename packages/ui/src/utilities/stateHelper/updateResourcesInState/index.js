export default function updateResourcesInState(state, action = {}) {
  if (!action.payload) {
    return state
  }

  if (!Array.isArray(action.payload)) {
    return state
  }

  const newResourcesMap = action.payload.reduce((idToResourceMap, resource) => {
    const { id } = resource
    idToResourceMap[id] = resource // eslint-disable-line no-param-reassign
    return idToResourceMap
  }, {})

  return newResourcesMap
}
