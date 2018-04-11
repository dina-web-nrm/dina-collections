import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  actionPrefix: 'CRUD_BLOCKS',
  keys: [
    ':name.collectionBlockType',
    ':name.filter',
    ':name.filter.group',
    ':name.filter.limit',
    ':name.filter.searchQuery',
    ':name.filter.parentId',
    ':name.filter.offset',
  ],
  name: 'crudBlocks',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
