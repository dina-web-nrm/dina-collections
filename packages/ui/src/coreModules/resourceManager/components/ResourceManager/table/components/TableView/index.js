import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { pick } from 'lodash'
import createLog from 'utilities/log'
import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { NoResultsFound } from 'coreModules/search/components/'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'

import createTableWrapper from '../../higherOrderComponents/createTableWrapper'
import InfinityTableBody from './InfinityTableBody'
import InfinityTableHeader from './InfinityTableHeader'

const log = createLog('resourceManager:TableView')

const tableHeaderStyle = {
  borderBottom: '1px solid #b5b5b5',
  position: 'relative',
}
const tableBodyStyle = { overflow: 'auto' }

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  fetchTableItems: PropTypes.func.isRequired,
  getTableWidth: PropTypes.func.isRequired,
  tableColumnSpecifications: PropTypes.arrayOf(
    PropTypes.shape({
      fieldPath: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  tableListItems: PropTypes.array.isRequired,
}

const TableView = props => {
  log.render()
  const {
    availableHeight,
    fetchTableItems,
    getTableWidth,
    tableColumnSpecifications,
    tableColumnsToShow,
    tableListItems,
  } = props

  const width = useMemo(() => {
    return getTableWidth({
      includeColumns: tableColumnsToShow,
      tableColumnSpecifications,
    })
  }, [getTableWidth, tableColumnSpecifications, tableColumnsToShow])

  useEffect(() => {
    fetchTableItems()
  }, [fetchTableItems])

  return (
    <RowLayout availableHeight={availableHeight}>
      <RowLayout.Row height={emToPixels(3.5)} style={tableHeaderStyle}>
        <InfinityTableHeader
          {...pick(props, [
            'enableTableColumnSorting',
            'onSaveTableColumnsToSort',
            'tableColumnSpecifications',
            'tableColumnsToShow',
            'tableColumnsToSort',
          ])}
          height={emToPixels(3.5)}
          width={width}
        />
      </RowLayout.Row>
      <RowLayout.Row
        dataTestId="tableScrollContainer"
        id="tableScrollContainer"
        style={tableBodyStyle}
      >
        {tableListItems.length > 0 ? (
          <InfinityTableBody
            {...pick(props, [
              'currentRowNumber',
              'fetchTableItems',
              'focusedItemId',
              'managerScope',
              'onClickRow',
              'resource',
              'tableBatchFetchOptions',
              'tableColumnSpecifications',
              'tableColumnsToShow',
              'tableListItems',
            ])}
            width={width}
          />
        ) : (
          <NoResultsFound />
        )}
      </RowLayout.Row>
    </RowLayout>
  )
}

TableView.propTypes = propTypes

export default compose(
  createTableWrapper(),
  injectWindowHeight
)(TableView)
