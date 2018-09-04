import { actionCreators as keyObjectActionCreators } from '../keyObjectModule'

const delNestedObjectNamspace =
  keyObjectActionCreators.del['nestedCache.:nameSpace.items']

const delNestedCache = keyObjectActionCreators.set.nestedCache

export default function clearNestedCache({ nameSpace } = {}) {
  return dispatch => {
    if (nameSpace) {
      return dispatch(
        delNestedObjectNamspace({
          nameSpace,
        })
      )
    }
    return dispatch(delNestedCache({}))
  }
}
