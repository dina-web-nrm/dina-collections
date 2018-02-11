import * as actionCreators from './actionCreators'
import * as actionTypes from './actionTypes'
import * as components from './components'
import * as constants from './constants'
import * as endpoints from './endpoints'
import * as selectors from './selectors'
import globalSelectors from './globalSelectors'
import middleware from './middleware'
import reducer from './reducer'

const name = constants.MODULE_NAME

export {
  actionCreators,
  actionTypes,
  components,
  constants,
  endpoints,
  globalSelectors,
  middleware,
  name,
  reducer,
  selectors,
}
