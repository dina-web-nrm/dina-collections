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
  initialValues: {
    filterState: {},
    searchState: {},
  },
  keys: ['searchState', 'filterState'],
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
