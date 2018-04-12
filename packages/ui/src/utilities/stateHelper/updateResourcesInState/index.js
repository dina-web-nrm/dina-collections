import immutable from 'object-path-immutable'

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

    return immutable.assign(idToResourceMap, id, resource)
  }, initialState)

  return newState
}
