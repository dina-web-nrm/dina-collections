import { createSelector } from 'reselect'

import { globalSelectors as keyObjectGlobalSelectors } from 'coreModules/resourceManager/keyObjectModule'

const getCurrentTableRowNumber = createSelector(
  keyObjectGlobalSelectors.get[':managerScope.focusedItemId'],
  keyObjectGlobalSelectors.get[':managerScope.tableListItems'],
  (focusedItemId, tableListItems) => {
    const focusedIndex = focusedItemId
      ? (tableListItems || []).findIndex(({ id }) => {
          return id !== undefined && id === focusedItemId
        })
      : -1

    return focusedIndex === -1 ? 1 : focusedIndex + 1
  }
)

const getCurrentTreeRowNumber = createSelector(
  keyObjectGlobalSelectors.get[':managerScope.focusedItemId'],
  keyObjectGlobalSelectors.get[':managerScope.treeListItems'],
  (focusedItemId, treeListItems) => {
    const focusedIndex = focusedItemId
      ? (treeListItems || []).findIndex(({ id }) => {
          return id !== undefined && id === focusedItemId
        })
      : -1

    return focusedIndex === -1 ? 1 : focusedIndex + 1
  }
)

export default {
  getCurrentTableRowNumber,
  getCurrentTreeRowNumber,
}
