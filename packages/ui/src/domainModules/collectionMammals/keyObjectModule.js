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
    filterColumnIsOpen: false,
    mainColumnActiveTab: 'resultTable',
  },
  keys: [
    'currentTableRowNumber',
    'filterColumnIsOpen',
    'mainColumnActiveTab',
    'totalNumberOfRecords',
  ],
  name: 'collectionMammals',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
