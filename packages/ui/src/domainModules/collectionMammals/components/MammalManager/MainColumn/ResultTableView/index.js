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
import InfiniteTable from './InfiniteTable'
import InfiniteTableHeader from './InfiniteTableHeader'

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

const infiniteTable = {
  id: 'resultTableScrollContainer',
  key: 'infiniteTable',
  renderRow: props => <InfiniteTable {...props} />,
  style: { overflow: 'auto' },
}

const infiniteTableHeader = {
  height: emToPixels(3.5),
  key: 'infiniteTableHeader',
  renderRow: props => (
    <InfiniteTableHeader
      {...props}
      height={emToPixels(3.5)}
      topOffset={emToPixels(11.1875)}
    />
  ),
  style: { borderBottom: '1px solid #b5b5b5' },
}

const rows = [infiniteTableHeader, infiniteTable]

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  onFormTabClick: PropTypes.func.isRequired,
  onSearchSpecimens: PropTypes.func.isRequired,
  onToggleFilters: PropTypes.func.isRequired,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired),
  tableColumnsToSort: PropTypes.arrayOf(PropTypes.object.isRequired),
  updateUserPreference: PropTypes.func.isRequired,
}
const defaultProps = {
  tableColumnsToShow: tableColumnNames,
  tableColumnsToSort: [],
}

class ResultTableView extends PureComponent {
  constructor(props) {
    super(props)

    this.handleSaveTableColumnsToSort = this.handleSaveTableColumnsToSort.bind(
      this
    )

    this.shortcuts = [
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
  connect(mapStateToProps, mapDispatchToProps),
  injectWindowHeight
)(ResultTableView)
