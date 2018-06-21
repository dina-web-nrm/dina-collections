import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { RowLayout } from 'coreModules/layout/components'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import CreateSpecimen from '../../CreateSpecimen'

/* eslint-disable */
const main = {
  height: undefined,
  key: 'main',
  renderRow: props => {
    if (props.mainColumnViewKey === 'newRecord') {
      return (
        <div className="ui fluid dina background" style={{ padding: '20px' }}>
          <CreateSpecimen />
        </div>
      )
    }
    return <div>{props.mainColumnViewKey}</div>
  },
  style: { border: '1px solid', overflow: 'auto' },
}

const recordNavigation = {
  height: '80px',
  key: 'recordNavigation',
  renderRow: props => <div>recordNavigation</div>,
  style: { border: '1px solid' },
}

const recordOptions = {
  height: '50px',
  key: 'recordOptions',
  renderRow: props => <div>recordOptions</div>,
  style: { border: '1px solid' },
}

const rows = [recordNavigation, recordOptions, main]

const propTypes = {
  mainColumnViewKey: PropTypes.string.isRequired,
  windowHeight: PropTypes.number.isRequired,
}

class MainColumn extends PureComponent {
  render() {
    const { mainColumnViewKey, windowHeight } = this.props

    return (
      <RowLayout
        availableHeight={windowHeight - 40}
        mainColumnViewKey={mainColumnViewKey}
        rows={rows}
      />
    )
  }
}

MainColumn.propTypes = propTypes

export default compose(injectWindowHeight)(MainColumn)
