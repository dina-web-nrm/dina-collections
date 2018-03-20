import * as actionCreators from './actionCreators'
import * as actionTypes from './actionTypes'
import * as constants from './constants'
import * as endpoints from './endpoints'
import * as selectors from './selectors'
import globalSelectors from './globalSelectors'
import reducer from './reducer'

const name = constants.MODULE_NAME

export {
  actionCreators,
  actionTypes,
  constants,
  endpoints,
  globalSelectors,
  name,
  reducer,
  selectors,
}
