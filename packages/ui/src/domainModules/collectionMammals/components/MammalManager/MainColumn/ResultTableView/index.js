import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { createInjectSearch } from 'coreModules/search/higherOrderComponents'

import { RowLayout } from 'coreModules/layout/components'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import InfiniteTable from './InfiniteTable'
import InfiniteTableHeader from './InfiniteTableHeader'

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
    <InfiniteTableHeader {...props} height={43} topOffset={183} />
  ),
  style: { borderBottom: '1px solid #b5b5b5' },
}

const rows = [infiniteTableHeader, infiniteTable]

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
}

class ResultTableView extends PureComponent {
  render() {
    const { availableHeight, ...rest } = this.props
    return (
      <RowLayout
        availableHeight={availableHeight}
        rows={rows}
        width={1700}
        {...rest}
      />
    )
  }
}

ResultTableView.propTypes = propTypes

export default compose(createInjectSearch({}), injectWindowHeight)(
  ResultTableView
)
