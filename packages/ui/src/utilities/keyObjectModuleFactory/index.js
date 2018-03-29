import createActionCreators from './createActionCreators'
import extractActionTypes from './extractActionTypes'
import createConstants from './createConstants'
import createGlobalSelectors from './createGlobalSelectors'
import createKeySpecifications from './createKeySpecifications'
import createReducer from './createReducer'
import createSelectors from './createSelectors'

export default function({
  actionPrefix: actionPrefixInput,
  initialValues,
  keys = [],
  name,
  reducerKey,
}) {
  const actionPrefix = actionPrefixInput || name.toUpperCase()

  const constants = createConstants({
    name,
  })

  const keySpecifications = createKeySpecifications({
    actionPrefix,
    keys,
  })

  const actionCreators = createActionCreators({ keySpecifications })

  const reducer = createReducer({ initialValues, keySpecifications })

  const selectors = createSelectors({ keySpecifications, name, reducerKey })

  const actionTypes = extractActionTypes({ keySpecifications })

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
