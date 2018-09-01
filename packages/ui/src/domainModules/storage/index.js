import * as components from './components'
import * as constants from './constants'
import markdown from './__markdown__/index.json'
import translations from './translations.json'
import { reducer } from './keyObjectModule'

const name = constants.MODULE_NAME

export { components, constants, markdown, name, reducer, translations }
