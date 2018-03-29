import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  actionPrefix: 'STORAGE_SERVICE',
  initialValues: {
    allStorageLocationsFetched: false,
    fetchingAllStorageLocations: false,
  },
  keys: ['allStorageLocationsFetched', 'fetchingAllStorageLocations'],
  name: 'storageService',
  reducerKey: 'keyObject',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
