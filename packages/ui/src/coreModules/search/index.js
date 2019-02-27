import * as actionCreators from './actionCreators'
// import * as components from './components'
import * as constants from './constants'
import translations from './translations.json'
import { actionTypes, globalSelectors, reducer } from './keyObjectModule'

const name = constants.MODULE_NAME

export {
  actionCreators,
  actionTypes,
  // components,
  constants,
  globalSelectors,
  name,
  reducer,
  translations,
}
