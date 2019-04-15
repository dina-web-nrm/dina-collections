import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  actionPrefix: 'MAMMALS',
  initialValues: {
    activeFormSectionIndex: null,
    filterColumnIsOpen: false,
    mainColumnActiveTab: 'resultTable',
    showAllFormSections: false,
  },
  keys: [
    'activeFormSectionIndex',
    'currentTableRowNumber',
    'filterColumnIsOpen',
    'focusedSpecimenId',
    'mainColumnActiveTab',
    'showAllFormSections',
    'totalNumberOfRecords',
  ],
  name: 'specimen',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
