import { actionCreators as keyObjectActionCreators } from '../keyObjectModule'

const delNestedObjectNamspace =
  keyObjectActionCreators.del['nestedCache.:namespace.items']

const delNestedCache = keyObjectActionCreators.set.nestedCache

export default function clearNestedCache({ namespace, namespaces } = {}) {
  return dispatch => {
    if (namespace) {
      return dispatch(
        delNestedObjectNamspace({
          namespace,
        })
      )
    }

    if (namespaces && namespaces.length) {
      return namespaces.forEach(namesp =>
        dispatch(
          delNestedObjectNamspace({
            namespace: namesp,
          })
        )
      )
    }

    return dispatch(delNestedCache({}))
  }
}
