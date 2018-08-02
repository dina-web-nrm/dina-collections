import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { createInjectSearch } from 'coreModules/search/higherOrderComponents'

import { RowLayout } from 'coreModules/layout/components'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import InfiniteTable from './InfiniteTable'
import InfiniteTableHeader from './InfiniteTableHeader'

const infiniteTable = {
  key: 'infiniteTable',
  renderRow: props => <InfiniteTable {...props} />,
}

const infiniteTableHeader = {
  height: '50px',
  key: 'infiniteTableHeader',
  renderRow: props => <InfiniteTableHeader {...props} />,
}

const rows = [infiniteTableHeader, infiniteTable]

const propTypes = {
  availableHeight: PropTypes.string.isRequired,
  mainColumnActiveTab: PropTypes.string.isRequired,
  windowHeight: PropTypes.number.isRequired,
}

class ResultTableView extends Component {
  render() {
    const {
      availableHeight,
      mainColumnActiveTab,
      windowHeight,
      ...rest
    } = this.props

    return (
      <RowLayout
        availableHeight={availableHeight}
        mainColumnActiveTab={mainColumnActiveTab}
        rows={rows}
        {...rest}
      />
    )
  }
}

ResultTableView.propTypes = propTypes

export default compose(createInjectSearch({}), injectWindowHeight)(
  ResultTableView
)
