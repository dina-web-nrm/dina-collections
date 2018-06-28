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
    activeTab: 'form',
    currentRecordNumber: null,
    filterColumnIsOpen: false,
    mainColumnViewKey: 'table',
    totalNumberOfRecords: null,
  },
  keys: [
    'activeTab',
    'currentRecordNumber',
    'filterColumnIsOpen',
    'mainColumnViewKey',
    'totalNumberOfRecords',
  ],
  name: 'collectionMammals',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
