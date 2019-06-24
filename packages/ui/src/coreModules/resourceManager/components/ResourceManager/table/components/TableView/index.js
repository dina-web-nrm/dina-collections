import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { pick } from 'lodash'
import { Dimmer, Grid, Loader } from 'semantic-ui-react'

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
  initialFilterValues: PropTypes.object,
  initialItemId: PropTypes.string,
  isPicker: PropTypes.bool.isRequired,
  searchInProgress: PropTypes.bool.isRequired,
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
const defaultProps = {
  initialFilterValues: undefined,
  initialItemId: undefined,
}

const TableView = props => {
  log.render()
  const {
    availableHeight,
    fetchTableItems,
    getTableWidth,
    initialFilterValues,
    initialItemId,
    isPicker,
    searchInProgress,
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
    fetchTableItems({
      useInitialFilters: !!(isPicker && initialFilterValues && !initialItemId),
    })
  }, [fetchTableItems, initialFilterValues, initialItemId, isPicker])

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
        {tableListItems.length > 0 && (
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
        )}
        {!tableListItems.length && searchInProgress && (
          <Grid padded>
            <Grid.Row style={{ height: emToPixels(3.5) }}>
              <Grid.Column style={{ paddingTop: 60, width: 150 }}>
                <Dimmer active inverted>
                  <Loader content="Loading" inverted />
                </Dimmer>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
        {!tableListItems.length && !searchInProgress && <NoResultsFound />}
      </RowLayout.Row>
    </RowLayout>
  )
}

TableView.propTypes = propTypes
TableView.defaultProps = defaultProps

export default compose(
  createTableWrapper(),
  injectWindowHeight
)(TableView)
