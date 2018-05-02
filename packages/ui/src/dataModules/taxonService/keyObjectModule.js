import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  actionPrefix: 'TAXON_SERVICE',
  initialValues: {
    allTaxaFetched: false,
    allTaxonNamesFetched: false,
    fetchingAllTaxa: false,
    fetchingAllTaxonNames: false,
  },
  keys: [
    'allTaxaFetched',
    'allTaxonNamesFetched',
    'fetchingAllTaxa',
    'fetchingAllTaxonNames',
  ],
  name: 'taxonService',
  reducerKey: 'keyObject',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
