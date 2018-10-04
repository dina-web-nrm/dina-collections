import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import InfiniteTableHeader from './InfiniteTableHeader'
import InfiniteTable from './InfiniteTable'

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
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
    key: 'infiniteTableHeader',
    style: { borderBottom: '1px solid #b5b5b5' },
  },
  {
    id: 'tableScrollContainer',
    key: 'infiniteTable',
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
      case 'infiniteTableHeader': {
        return (
          <InfiniteTableHeader
            height={emToPixels(3.5)}
            resource={resource}
            tableColumnSpecifications={tableColumnSpecifications}
            width={width}
          />
        )
      }
      case 'infiniteTable': {
        const { tableBatchFetchOptions } = this.props
        return <InfiniteTable {...this.props} {...tableBatchFetchOptions} />
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
