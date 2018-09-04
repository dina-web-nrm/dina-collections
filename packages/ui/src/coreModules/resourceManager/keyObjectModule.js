import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  actionPrefix: 'RESOURCE_MANAGER',
  keys: [
    ':resource.baseItems',
    ':resource.currentTableRowNumber',
    ':resource.expandedIds',
    ':resource.focusIdWhenLoaded',
    ':resource.listFilterValues',
    ':resource.listItems',
    ':resource.showAll',
  ],
  name: 'resourceManager',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
