import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  actionPrefix: 'CURATED_LIST_SERVICE',
  initialValues: {
    allDistinguishedUnitTypesFetched: false,
    allFeatureObservationTypesFetched: false,
    fetchingAllDistinguishedUnitTypes: false,
    fetchingAllFeatureObservationTypes: false,
  },
  keys: [
    'allDistinguishedUnitTypesFetched',
    'allFeatureObservationTypesFetched',
    'fetchingAllDistinguishedUnitTypes',
    'fetchingAllFeatureObservationTypes',
  ],
  name: 'curatedListService',
  reducerKey: 'keyObject',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
