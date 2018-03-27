import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'
import { MODULE_NAME as name } from './constants'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  initialValues: {
    layoutMode: 'split',
  },
  keys: ['layoutMode'],
  name,
})
export { actionCreators, actionTypes, constants, globalSelectors, reducer }
