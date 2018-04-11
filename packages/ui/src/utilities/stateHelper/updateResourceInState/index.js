import immutable from 'object-path-immutable'

export default function updateResourceInState(state, action = {}) {
  if (!action.payload) {
    return state
  }

  if (!action.payload.id) {
    return state
  }

  const { id } = action.payload

  return immutable.assign(state, id, action.payload)
}
