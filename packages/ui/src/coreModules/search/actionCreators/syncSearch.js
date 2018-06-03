import crudActionCreators from 'coreModules/crud/actionCreators'

export default function syncSearch({ resource = 'searchSpecimen' }) {
  const getMany =
    crudActionCreators[resource] && crudActionCreators[resource].getMany
  if (!getMany) {
    throw new Error(`Cant find actionCreator getMany for resource: ${resource}`)
  }

  return dispatch => {
    return dispatch(getMany({})).then(result => {
      return result
    })
  }
}
