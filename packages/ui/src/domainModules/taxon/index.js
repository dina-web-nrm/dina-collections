import * as components from './components'
import * as actionTypes from './actionTypes'
import * as constants from './constants'
import middleware from './middleware'
import reducer from './reducer'
import translations from './translations.json'

const name = constants.MODULE_NAME

export {
  actionTypes,
  components,
  constants,
  middleware,
  name,
  reducer,
  translations,
}
