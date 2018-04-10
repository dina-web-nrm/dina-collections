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
    allFeatureTypesFetched: false,
    fetchingAllDistinguishedUnitTypes: false,
    fetchingAllFeatureTypes: false,
  },
  keys: [
    'allDistinguishedUnitTypesFetched',
    'allFeatureTypesFetched',
    'fetchingAllDistinguishedUnitTypes',
    'fetchingAllFeatureTypes',
  ],
  name: 'curatedListService',
  reducerKey: 'keyObject',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
