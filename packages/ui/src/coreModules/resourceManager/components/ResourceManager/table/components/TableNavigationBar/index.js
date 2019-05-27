import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import createTableModuleWrapper from '../../higherOrderComponents/createTableModuleWrapper'
import RecordNavigationBar from '../../../shared/RecordNavigationBar'

const propTypes = {
  createItemActive: PropTypes.bool.isRequired,
  currentRowNumber: PropTypes.number.isRequired,
  editItemActive: PropTypes.bool.isRequired,
  fetchTableItems: PropTypes.func.isRequired,
  getHasNextRow: PropTypes.func.isRequired,
  getHasPreviousRow: PropTypes.func.isRequired,
  navigateCreate: PropTypes.func.isRequired,
  onFocusNextRow: PropTypes.func.isRequired,
  onFocusPreviousRow: PropTypes.func.isRequired,
  onFocusRow: PropTypes.func.isRequired,
  onShowAllRecords: PropTypes.func.isRequired,
  resourceCount: PropTypes.number,
  tableListItems: PropTypes.array.isRequired,
}
const defaultProps = {
  resourceCount: undefined,
}

const TableNavigationBar = ({
  createItemActive,
  currentRowNumber,
  editItemActive,
  fetchTableItems,
  getHasNextRow,
  getHasPreviousRow,
  navigateCreate,
  onFocusNextRow,
  onFocusPreviousRow,
  onFocusRow,
  onShowAllRecords,
  tableListItems,
  resourceCount,
}) => {
  const numberOfListItems = tableListItems.length

  useEffect(() => {
    if (createItemActive || editItemActive) {
      fetchTableItems()
    }
  }, [createItemActive, editItemActive, fetchTableItems])

  return (
    <RecordNavigationBar
      currentRowNumber={currentRowNumber}
      disableCreate={createItemActive}
      disableRecordNavigation={createItemActive}
      getHasNextRow={getHasNextRow}
      getHasPreviousRow={getHasPreviousRow}
      navigateCreate={navigateCreate}
      numberOfListItems={numberOfListItems}
      onFocusNextRow={onFocusNextRow}
      onFocusPreviousRow={onFocusPreviousRow}
      onFocusRow={onFocusRow}
      onShowAllRecords={onShowAllRecords}
      totalNumberOfRecords={resourceCount}
    />
  )
}

TableNavigationBar.propTypes = propTypes
TableNavigationBar.defaultProps = defaultProps

export default compose(createTableModuleWrapper())(TableNavigationBar)
