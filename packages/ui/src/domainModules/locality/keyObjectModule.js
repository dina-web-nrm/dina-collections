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
      localityCollection: {
        group: '',
        searchQuery: '',
      },
    },
  },
  keys: [
    'allLocalitiesFetched',
    'collectionBlockType',
    'fetchingAllLocalities',
    'filter:index',
    'filter:index.group',
    'filter:index.limit',
    'filter:index.searchQuery',
    'localityDropdown.:identifier.searchQuery',
  ],
  name: 'locality',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
