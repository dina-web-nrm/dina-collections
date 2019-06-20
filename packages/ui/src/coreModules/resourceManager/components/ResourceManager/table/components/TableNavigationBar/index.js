import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import createTableWrapper from '../../higherOrderComponents/createTableWrapper'
import RecordNavigationBar from '../../../shared/components/RecordNavigationBar'

const propTypes = {
  currentRowNumber: PropTypes.number,
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
  currentRowNumber: undefined,
  resourceCount: undefined,
}

const TableNavigationBar = ({
  currentRowNumber,
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

  return (
    <RecordNavigationBar
      currentRowNumber={currentRowNumber}
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

export default compose(createTableWrapper())(TableNavigationBar)
