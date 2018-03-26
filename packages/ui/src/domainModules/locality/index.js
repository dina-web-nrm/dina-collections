import * as components from './components'
import { actionTypes, constants, reducer } from './keyObjectModule'
import translations from './translations.json'
// import * as actionCreators from './actionCreators'
// import * as actionTypes from './actionTypes'
// import * as constants from './constants'
// import * as selectors from './selectors'
// import globalSelectors from './globalSelectors'
// import reducer from './reducer'

const name = constants.MODULE_NAME

// export {
//   actionCreators,
//   actionTypes,
//   constants,
//   globalSelectors,
//   name,
//   reducer,
//   selectors,
// }

export { actionTypes, components, constants, name, reducer, translations }
