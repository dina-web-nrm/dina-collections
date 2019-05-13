import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { NoResultsFound } from 'coreModules/search/components/'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import userSelectors from 'coreModules/user/globalSelectors'
import { updateUserPreference } from 'coreModules/user/actionCreators'

import InfinityTableHeader from './InfinityTableHeader'
import InfinityTable from './InfinityTable'

const mapStateToProps = (state, { resource, tableColumnSpecifications }) => {
  const userPreferences = userSelectors.getUserPreferences(state)
  const allTableColumns = tableColumnSpecifications.map(
    ({ fieldPath }) => fieldPath
  )

  return {
    tableColumnsToShow:
      (userPreferences && userPreferences[`${resource}TableColumns`]) ||
      allTableColumns,
    tableColumnsToSort:
      (userPreferences && userPreferences[`${resource}TableColumnsSorting`]) ||
      undefined,
  }
}

const mapDispatchToProps = { updateUserPreference }

const rows = [
  {
    height: emToPixels(3.5),
    key: 'infinityTableHeader',
    style: { borderBottom: '1px solid #b5b5b5', position: 'relative' },
  },
  {
    id: 'tableScrollContainer',
    key: 'tableScrollContainer',
    style: { overflow: 'auto' },
  },
]

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  enableTableColumnSorting: PropTypes.bool.isRequired,
  listItems: PropTypes.array.isRequired,
  managerScope: PropTypes.string.isRequired,
  onFormTabClick: PropTypes.func.isRequired,
  onSelectNextRecord: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onSelectPreviousRecord: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onToggleFilters: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  tableBatchFetchOptions: PropTypes.object,
  tableColumnSpecifications: PropTypes.array.isRequired,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  tableColumnsToSort: PropTypes.arrayOf(PropTypes.object.isRequired),
  tableSearch: PropTypes.func,
  updateUserPreference: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
}
const defaultProps = {
  onSelectNextRecord: false,
  onSelectPreviousRecord: false,
  tableBatchFetchOptions: {},
  tableColumnsToSort: [],
  tableSearch: undefined,
}

class ResultTableView extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSaveTableColumnsToSort = this.handleSaveTableColumnsToSort.bind(
      this
    )
    this.handleSelectNextRecord = this.handleSelectNextRecord.bind(this)
    this.handleSelectPreviousRecord = this.handleSelectPreviousRecord.bind(this)

    this.shortcuts = [
      {
        command: 'down',
        description: 'Move focus to next record',
        onPress: this.handleSelectNextRecord,
      },
      {
        command: 'up',
        description: 'Move focus to previous record',
        onPress: this.handleSelectPreviousRecord,
      },
      {
        command: 'space',
        description: 'Open focused record',
        onPress: props.onFormTabClick,
      },
      {
        command: 'f',
        description: 'Show/hide filters',
        onPress: props.onToggleFilters,
      },
    ]
  }

  handleSelectNextRecord() {
    if (this.props.onSelectNextRecord) {
      this.props.onSelectNextRecord()
    }
  }

  handleSelectPreviousRecord() {
    if (this.props.onSelectPreviousRecord) {
      this.props.onSelectPreviousRecord()
    }
  }

  handleSaveTableColumnsToSort(columnsToSort) {
    return this.props
      .updateUserPreference(
        `${this.props.resource}TableColumnsSorting`,
        columnsToSort
      )
      .then(() => {
        return this.props.tableSearch()
      })
  }

  render() {
    const {
      availableHeight,
      enableTableColumnSorting,
      listItems,
      managerScope,
      resource,
      tableBatchFetchOptions,
      tableColumnSpecifications,
      tableColumnsToShow,
      tableColumnsToSort,
      width,
    } = this.props

    return (
      <RowLayout availableHeight={availableHeight} rows={rows}>
        <InfinityTableHeader
          enableTableColumnSorting={enableTableColumnSorting}
          height={emToPixels(3.5)}
          onSaveTableColumnsToSort={this.handleSaveTableColumnsToSort}
          tableColumnSpecifications={tableColumnSpecifications}
          tableColumnsToShow={tableColumnsToShow}
          tableColumnsToSort={tableColumnsToSort}
          width={width}
        />
        {listItems.length > 0 ? (
          <InfinityTable
            {...tableBatchFetchOptions}
            managerScope={managerScope}
            resource={tableBatchFetchOptions.resource || resource}
            tableColumnsToShow={tableColumnsToShow}
            width={width}
          />
        ) : (
          <NoResultsFound />
        )}
      </RowLayout>
    )
  }
}

ResultTableView.propTypes = propTypes
ResultTableView.defaultProps = defaultProps

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectWindowHeight
)(ResultTableView)
