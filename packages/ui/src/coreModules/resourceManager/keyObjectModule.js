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
    ':managerScope.focusItemIdWhenLoaded',
    ':managerScope.focusedItemId',
    ':managerScope.hasAppliedFilter',
    ':managerScope.listFilterValues',
    ':managerScope.showAll',
    ':managerScope.tableListItems',
    ':managerScope.treeBaseItems',
    ':managerScope.treeExpandedIds',
    ':managerScope.treeListItems',
  ],
  name: 'resourceManager',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
