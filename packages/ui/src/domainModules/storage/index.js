import * as components from './components'
import * as constants from './constants'
import globalSelectors from './globalSelectors'
import markdown from './__markdown__/index.json'
import translations from './translations.json'
import { reducer } from './keyObjectModule'

const name = constants.MODULE_NAME

export {
  components,
  constants,
  globalSelectors,
  markdown,
  name,
  reducer,
  translations,
}
