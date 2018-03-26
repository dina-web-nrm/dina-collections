import createActionCreators from './createActionCreators'
import createActionTypes from './createActionTypes'
import createConstants from './createConstants'
import createGlobalSelectors from './createGlobalSelectors'
import createKeyMap from './createKeyMap'
import createReducer from './createReducer'
import createSelectors from './createSelectors'

export default function({ initialValues, keys = [], name }) {
  const actionPrefix = name

  const constants = createConstants({
    name,
  })

  const keyMap = createKeyMap({
    actionPrefix,
    keys,
  })

  const actionCreators = createActionCreators(keyMap)

  const reducer = createReducer({ initialValues, keyMap })
  const selectors = createSelectors({ keyMap, name })

  const actionTypes = createActionTypes({ keyMap })

  const globalSelectors = createGlobalSelectors(selectors)
  return {
    actionCreators,
    actionTypes,
    constants,
    globalSelectors,
    reducer,
    selectors,
  }
}
