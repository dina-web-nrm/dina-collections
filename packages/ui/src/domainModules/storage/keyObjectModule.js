import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  actionPrefix: 'STORAGE',
  initialValues: {
    search: {
      loading: false,
      searchQuery: '',
    },
  },
  keys: [
    ':name.collectionBlockType',
    ':name.filter',
    ':name.filter.group',
    ':name.filter.limit',
    ':name.filter.searchQuery',
    ':name.filter.parentId',
    ':name.filter.offset',
    'search',
    'search.searchQuery',
    'search.loading',
  ],
  name: 'storage',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
