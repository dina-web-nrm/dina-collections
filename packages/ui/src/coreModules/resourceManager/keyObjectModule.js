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
    ':managerScope',
    ':managerScope.currentTableRowNumber',
    ':managerScope.focusIdWhenLoaded',
    ':managerScope.focusedItemId',
    ':managerScope.listFilterValues',
    ':managerScope.listItems',
    ':managerScope.showAll',
    ':managerScope.treeBaseItems',
    ':managerScope.treeExpandedIds',
    ':managerScope.treeListItems',
  ],
  name: 'resourceManager',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
