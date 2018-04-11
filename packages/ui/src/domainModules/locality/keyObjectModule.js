import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  actionPrefix: 'LOCALITY',
  initialValues: {
    localityDropdown: {},
  },
  keys: ['localityDropdown.:identifier.searchQuery'],
  name: 'locality',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
