import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { NoResultsFound } from 'coreModules/search/components/'
import InfinityTableHeader from './InfinityTableHeader'
import InfinityTable from './InfinityTable'

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  listItems: PropTypes.array.isRequired,
  resource: PropTypes.string.isRequired,
  tableBatchFetchOptions: PropTypes.object,
  tableColumnSpecifications: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
}
const defaultProps = {
  tableBatchFetchOptions: {},
}

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

class ResultTableView extends PureComponent {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  renderRow(key) {
    const { tableColumnSpecifications, resource, width } = this.props

    switch (key) {
      case 'infinityTableHeader': {
        return (
          <InfinityTableHeader
            height={emToPixels(3.5)}
            resource={resource}
            tableColumnSpecifications={tableColumnSpecifications}
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

export default ResultTableView
