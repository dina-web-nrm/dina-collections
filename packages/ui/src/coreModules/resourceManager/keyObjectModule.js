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
    ':managerScope.baseItems',
    ':managerScope.currentTableRowNumber',
    ':managerScope.expandedIds',
    ':managerScope.focusIdWhenLoaded',
    ':managerScope.listFilterValues',
    ':managerScope.listItems',
    ':managerScope.showAll',
  ],
  name: 'resourceManager',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
