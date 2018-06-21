import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { RowLayout } from 'coreModules/layout/components'
import { injectWindowHeight } from '../../../../../coreModules/size/higherOrderComponents'

const main = {
  height: undefined,
  key: 'main',
  renderRow: () => <div>filter cards</div>,
  style: { border: '1px solid' },
}

const header = {
  height: '50px',
  key: 'header',
  renderRow: () => <h2>Filters</h2>,
  style: { border: '1px solid' },
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
