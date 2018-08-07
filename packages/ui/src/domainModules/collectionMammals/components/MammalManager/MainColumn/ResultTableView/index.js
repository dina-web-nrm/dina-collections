import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import { RowLayout } from 'coreModules/layout/components'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import userSelectors from 'coreModules/user/globalSelectors'
import { SPECIMENS_MAMMALS_TABLE_COLUMNS } from '../../../../constants'
import { getTableWidth, tableColumnNames } from '../tableColumnSpecifications'
import InfiniteTable from './InfiniteTable'
import InfiniteTableHeader from './InfiniteTableHeader'

const mapStateToProps = state => {
  const userPreferences = userSelectors.getUserPreferences(state)

  return {
    tableColumnsToShow:
      (userPreferences && userPreferences[SPECIMENS_MAMMALS_TABLE_COLUMNS]) ||
      undefined,
  }
}

const infiniteTable = {
  id: 'resultTableScrollContainer',
  key: 'infiniteTable',
  renderRow: props => <InfiniteTable {...props} />,
  style: { overflow: 'auto' },
}

const infiniteTableHeader = {
  height: '43px',
  key: 'infiniteTableHeader',
  renderRow: props => (
    <InfiniteTableHeader {...props} height={43} topOffset={141} />
  ),
  style: { borderBottom: '1px solid #b5b5b5' },
}

const rows = [infiniteTableHeader, infiniteTable]

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired),
}
const defaultProps = {
  tableColumnsToShow: tableColumnNames,
}

class ResultTableView extends PureComponent {
  render() {
    const { availableHeight, tableColumnsToShow, ...rest } = this.props
    return (
      <RowLayout
        availableHeight={availableHeight}
        rows={rows}
        tableColumnsToShow={tableColumnsToShow}
        width={getTableWidth(tableColumnsToShow)}
        {...rest}
      />
    )
  }
}

ResultTableView.propTypes = propTypes
ResultTableView.defaultProps = defaultProps

export default compose(
  connect(mapStateToProps),
  createInjectSearch({}),
  injectWindowHeight
)(ResultTableView)
