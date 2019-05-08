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
  listItems: PropTypes.array.isRequired,
  onFormTabClick: PropTypes.func.isRequired,
  onSelectNextRecord: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onSelectPreviousRecord: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onToggleFilters: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  tableBatchFetchOptions: PropTypes.object,
  tableColumnSpecifications: PropTypes.array.isRequired,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  tableSearch: PropTypes.func,
  updateUserPreference: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
}
const defaultProps = {
  onSelectNextRecord: false,
  onSelectPreviousRecord: false,
  tableBatchFetchOptions: {},
  tableSearch: undefined,
}

class ResultTableView extends PureComponent {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  renderRow(key) {
    const {
      tableColumnSpecifications,
      tableColumnsToShow,
      resource,
      width,
    } = this.props

    switch (key) {
      case 'infinityTableHeader': {
        return (
          <InfinityTableHeader
            height={emToPixels(3.5)}
            resource={resource}
            tableColumnSpecifications={tableColumnSpecifications}
            tableColumnsToShow={tableColumnsToShow}
            width={width}
          />
        )
      }
      case 'tableScrollContainer': {
        const { listItems, tableBatchFetchOptions } = this.props
        return listItems.length === 0 ? (
          <NoResultsFound />
        ) : (
          <InfinityTable {...this.props} {...tableBatchFetchOptions} />
        )
      }
      default: {
        throw new Error(`Unknown row key: ${key}`)
      }
    }
  }
  render() {
    return <RowLayout {...this.props} renderRow={this.renderRow} rows={rows} />
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
