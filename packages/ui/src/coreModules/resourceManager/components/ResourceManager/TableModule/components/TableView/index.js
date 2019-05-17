import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { pick } from 'lodash'

import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { NoResultsFound } from 'coreModules/search/components/'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'

import createTableModuleWrapper from '../../higherOrderComponents/createTableModuleWrapper'
import InfinityTableBody from './InfinityTableBody'
import InfinityTableHeader from './InfinityTableHeader'

const tableHeaderStyle = {
  borderBottom: '1px solid #b5b5b5',
  position: 'relative',
}
const tableBodyStyle = { overflow: 'auto' }

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  tableListItems: PropTypes.array.isRequired,
}

const ResultTableView = props => {
  const { availableHeight, tableListItems } = props

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
            'width',
          ])}
          height={emToPixels(3.5)}
        />
      </RowLayout.Row>
      <RowLayout.Row style={tableBodyStyle}>
        {tableListItems.length > 0 ? (
          <InfinityTableBody
            {...pick(props, [
              'currentRowNumber',
              'focusedItemId',
              'listItems',
              'managerScope',
              'onClickRow',
              'resource',
              'tableBatchFetchOptions',
              'tableColumnSpecifications',
              'tableColumnsToShow',
              'tableListItems',
              'width',
            ])}
          />
        ) : (
          <NoResultsFound />
        )}
      </RowLayout.Row>
    </RowLayout>
  )
}

ResultTableView.propTypes = propTypes

export default compose(
  createTableModuleWrapper(),
  injectWindowHeight
)(ResultTableView)
