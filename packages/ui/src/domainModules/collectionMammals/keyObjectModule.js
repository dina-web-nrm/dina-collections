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
    mainColumnViewKey: 'newRecord',
    totalNumberOfRecords: null,
  },
  keys: [
    'currentRecordNumber',
    'filterColumnIsOpen',
    'mainColumnViewKey',
    'totalNumberOfRecords',
  ],
  name: 'collectionMammals',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
