import * as components from './components'
import * as constants from './constants'
import * as higherOrderComponents from './higherOrderComponents'
import translations from './translations.json'
import {
  actionCreators,
  actionTypes,
  globalSelectors,
  reducer,
} from './keyObjectModule'

const name = constants.MODULE_NAME

export {
  actionCreators,
  actionTypes,
  components,
  constants,
  globalSelectors,
  higherOrderComponents,
  name,
  reducer,
  translations,
}
