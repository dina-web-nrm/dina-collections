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
    currentRecordNumber: null,
    filterColumnIsOpen: false,
    mainColumnViewKey: 'table',
    totalNumberOfRecords: null,
  },
  keys: [
    'currentRecordNumber',
    'filterColumnIsOpen',
    'mainColumnActiveTab',
    'totalNumberOfRecords',
  ],
  name: 'collectionMammals',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
