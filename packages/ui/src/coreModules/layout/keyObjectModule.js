import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'
import { MODULE_NAME as name } from './constants'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  selectors,
  reducer,
} = keyObjectModuleFactory({
  keys: [':name.layoutMode'],
  name,
})
export {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  selectors,
  reducer,
}
