import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import createTableWrapper from '../../../table/higherOrderComponents/createTableWrapper'
import RecordNavigationBar from '../../../shared/components/RecordNavigationBar'

const propTypes = {
  createItemActive: PropTypes.bool.isRequired,
  currentRowNumber: PropTypes.number,
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
  currentRowNumber: undefined,
  resourceCount: undefined,
}

const FormNavigationBar = ({
  createItemActive,
  currentRowNumber,
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
    fetchTableItems()
  }, [createItemActive, fetchTableItems])

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

FormNavigationBar.propTypes = propTypes
FormNavigationBar.defaultProps = defaultProps

export default compose(createTableWrapper())(FormNavigationBar)
