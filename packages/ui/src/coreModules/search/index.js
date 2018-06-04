import * as constants from './constants'
import * as actionCreators from './actionCreators'
import { actionTypes, globalSelectors, reducer } from './keyObjectModule'

const name = constants.MODULE_NAME

export {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  name,
  reducer,
}
