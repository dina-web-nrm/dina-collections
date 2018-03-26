import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  initialValues: {
    collectionBlockType: 'list',
    filter: {
      localityCollection: {
        group: '',
        searchQuery: '',
      },
    },
  },
  keys: [
    'collectionBlockType',
    'filter:index',
    'filter:index.searchQuery',
    'filter:index.limit',
    'filter:index.group',
  ],
  name: 'locality',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
