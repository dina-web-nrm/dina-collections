import * as actionCreators from './actionCreators'
import * as actionTypes from './actionTypes'
import * as components from './components'
import * as constants from './constants'
import * as higherOrderComponents from './higherOrderComponents'
import * as schemas from './schemas'
import * as selectors from './selectors'
import globalSelectors from './globalSelectors'
import reducer from './reducer'

const name = constants.MODULE_NAME

export {
  actionCreators,
  actionTypes,
  components,
  globalSelectors,
  higherOrderComponents,
  name,
  reducer,
  schemas,
  selectors,
}
