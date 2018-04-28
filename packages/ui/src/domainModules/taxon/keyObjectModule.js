import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  actionPrefix: 'TAXON',
  initialValues: {
    localityDropdown: {},
  },
  keys: ['localityDropdown.:identifier.searchQuery'],
  name: 'taxon',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
