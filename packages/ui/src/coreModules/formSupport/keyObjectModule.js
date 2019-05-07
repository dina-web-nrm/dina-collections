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
  keys: [
    ':formName',
    'sectionNavigation.:formName.sectionInvalidStatus',
    'sectionNavigation.:formName.activeFormSectionIndex',
    'sectionNavigation.:formName.showAllFormSections',
  ],
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
