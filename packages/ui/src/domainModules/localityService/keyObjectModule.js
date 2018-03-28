import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  actionPrefix: 'LOCALITY_SERVICE',
  initialValues: {
    allLocalitiesFetched: false,
    fetchingAllLocalities: false,
  },
  keys: ['allLocalitiesFetched', 'fetchingAllLocalities'],
  name: 'localityService',
  reducerKey: 'keyObject',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
