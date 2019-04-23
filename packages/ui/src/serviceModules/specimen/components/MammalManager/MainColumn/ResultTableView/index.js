import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'
import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import userSelectors from 'coreModules/user/globalSelectors'
import { updateUserPreference } from 'coreModules/user/actionCreators'
import {
  SPECIMENS_MAMMALS_TABLE_COLUMNS,
  SPECIMENS_MAMMALS_TABLE_COLUMNS_SORTING,
} from '../../../../constants'
import { getTableWidth, tableColumnNames } from '../tableColumnSpecifications'
import InfinityTable from './InfinityTable'
import InfinityTableHeader from './InfinityTableHeader'

const mapStateToProps = state => {
  const userPreferences = userSelectors.getUserPreferences(state)

  return {
    tableColumnsToShow:
      (userPreferences && userPreferences[SPECIMENS_MAMMALS_TABLE_COLUMNS]) ||
      undefined,
    tableColumnsToSort:
      (userPreferences &&
        userPreferences[SPECIMENS_MAMMALS_TABLE_COLUMNS_SORTING]) ||
      undefined,
  }
}

const mapDispatchToProps = { updateUserPreference }

const infinityTable = {
  id: 'resultTableScrollContainer',
  key: 'infinityTable',
  renderRow: props => <InfinityTable {...props} />,
  style: { overflow: 'auto' },
}

const infinityTableHeader = {
  height: emToPixels(3.5),
  key: 'infinityTableHeader',
  renderRow: props => (
    <InfinityTableHeader
      {...props}
      height={emToPixels(3.5)}
      topOffset={emToPixels(11.1875)}
    />
  ),
  style: { borderBottom: '1px solid #b5b5b5' },
}

const rows = [infinityTableHeader, infinityTable]

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  onFormTabClick: PropTypes.func.isRequired,
  onSearchSpecimens: PropTypes.func.isRequired,
  onSelectNextRecord: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onSelectPreviousRecord: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onToggleFilters: PropTypes.func.isRequired,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired),
  tableColumnsToSort: PropTypes.arrayOf(PropTypes.object.isRequired),
  updateUserPreference: PropTypes.func.isRequired,
}
const defaultProps = {
  onSelectNextRecord: false,
  onSelectPreviousRecord: false,
  tableColumnsToShow: tableColumnNames,
  tableColumnsToSort: [],
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
    return this.props.updateUserPreference(
      SPECIMENS_MAMMALS_TABLE_COLUMNS_SORTING,
      columnsToSort
    )
  }

  render() {
    const {
      availableHeight,
      tableColumnsToShow,
      tableColumnsToSort,
      ...rest
    } = this.props

    return (
      <React.Fragment>
        <KeyboardShortcuts shortcuts={this.shortcuts} />
        <RowLayout
          {...rest}
          availableHeight={availableHeight}
          onSaveTableColumnsToSort={this.handleSaveTableColumnsToSort}
          rows={rows}
          tableColumnsToShow={tableColumnsToShow}
          tableColumnsToSort={tableColumnsToSort}
          width={getTableWidth(tableColumnsToShow)}
        />
      </React.Fragment>
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
