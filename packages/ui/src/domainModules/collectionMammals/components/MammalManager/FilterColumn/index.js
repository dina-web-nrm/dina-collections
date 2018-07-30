import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { RowLayout } from 'coreModules/layout/components'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import Filters from './Filters'

const main = {
  key: 'main',
  renderRow: props => <Filters {...props} />,
}

const header = {
  height: '50px',
  key: 'header',
  renderRow: () => <h2>Find records</h2>,
}

const rows = [header, main]

const propTypes = {
  windowHeight: PropTypes.number.isRequired,
}

class FilterColumn extends PureComponent {
  render() {
    const { windowHeight } = this.props

    return <RowLayout availableHeight={windowHeight - 40} rows={rows} />
  }
}

FilterColumn.propTypes = propTypes

export default compose(injectWindowHeight)(FilterColumn)
