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
    leftSidebar: {
      isOpen: false,
    },
  },
  keys: ['applicationLayer', 'leftSidebar.isOpen', ':name.layoutMode'],
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
