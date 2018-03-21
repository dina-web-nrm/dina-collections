export default function updateResourcesInState(state, action = {}) {
  if (!action.payload) {
    return state
  }

  if (!Array.isArray(action.payload)) {
    return state
  }

  const initialState = { ...state }

  const newState = action.payload.reduce((idToResourceMap, resource) => {
    const { id } = resource

    // this is ok since we did a spread of the state above, so it's a new object
    idToResourceMap[id] = resource // eslint-disable-line no-param-reassign

    return idToResourceMap
  }, initialState)

  return newState
}
