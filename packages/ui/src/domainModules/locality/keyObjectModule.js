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
    collectionBlockType: 'list',
    filter: {
      group: 'continent',
      offset: 0,
      searchQuery: '',
    },
  },
  keys: [
    'collectionBlockType',
    'fetchingAllLocalities',
    'filter',
    'filter.group',
    'filter.limit',
    'filter.searchQuery',
    'filter.parentId',
    'filter.offset',
    'localityDropdown.:identifier.searchQuery',
  ],
  name: 'locality',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
