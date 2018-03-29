import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  initialValues: {
    allLocalitiesFetched: false,
    collectionBlockType: 'list',
    fetchingAllLocalities: false,
    filter: {
      group: 'continent',
      offset: 0,
      searchQuery: '',
    },
  },
  keys: [
    'allLocalitiesFetched',
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
