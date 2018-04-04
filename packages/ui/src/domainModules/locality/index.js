import * as components from './components'
import { actionTypes, constants, reducer } from './keyObjectModule'
import globalSelectors from './globalSelectors'
import translations from './translations.json'

const name = constants.MODULE_NAME

export {
  actionTypes,
  components,
  constants,
  globalSelectors,
  name,
  reducer,
  translations,
}
