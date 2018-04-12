import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  actionPrefix: 'PLACE_SERVICE',
  initialValues: {
    allPlacesFetched: false,
    fetchingAllLocalities: false,
  },
  keys: ['allPlacesFetched', 'fetchingAllLocalities'],
  name: 'placeService',
  reducerKey: 'keyObject',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
