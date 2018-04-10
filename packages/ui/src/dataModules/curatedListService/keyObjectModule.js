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
    allFeatureTypesFetched: false,
    allPreparationTypesFetched: false,
    fetchingAllFeatureTypes: false,
    fetchingAllPreparationTypes: false,
  },
  keys: [
    'allFeatureTypesFetched',
    'allPreparationTypesFetched',
    'fetchingAllFeatureTypes',
    'fetchingAllPreparationTypes',
  ],
  name: 'curatedListService',
  reducerKey: 'keyObject',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
