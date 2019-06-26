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
    ':managerScope.focusItemIdWhenLoaded',
    ':managerScope.focusedItemId',
    ':managerScope.idsAddedToBucket',
    ':managerScope.hasAppliedFilter',
    ':managerScope.showAll',
    ':managerScope.tableListItems',
    ':managerScope.treeBaseItems',
    ':managerScope.treeExpandedIds',
    ':managerScope.treeListItems',
  ],
  name: 'resourceManager',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
