import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { RowLayout } from 'coreModules/layout/components'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import CreateSpecimen from '../../CreateSpecimen'
import RecordNavigationBar from './RecordNavigationBar'
import ResultOptionsBar from './ResultOptionsBar'

/* eslint-disable */
const main = {
  height: undefined,
  key: 'main',
  renderRow: props => {
    if (props.mainColumnActiveTab === 'newRecord') {
      return (
        <div className="ui fluid dina background" style={{ padding: '20px' }}>
          <CreateSpecimen />
        </div>
      )
    }
    return <div>{props.mainColumnActiveTab}</div>
  },
  style: { border: '1px solid', overflow: 'auto' },
}

const recordNavigation = {
  height: '100px',
  key: 'recordNavigation',
  renderRow: props => <RecordNavigationBar {...props} />,
  style: { border: '1px solid' },
}

const recordOptions = {
  height: '100px',
  key: 'recordOptions',
  renderRow: props => <ResultOptionsBar {...props} />,
  style: { border: '1px solid', overflow: 'auto' },
}

const rows = [recordNavigation, recordOptions, main]

const propTypes = {
  mainColumnActiveTab: PropTypes.string.isRequired,
  windowHeight: PropTypes.number.isRequired,
}

class MainColumn extends PureComponent {
  render() {
    const { mainColumnActiveTab, windowHeight, ...rest } = this.props

    return (
      <RowLayout
        availableHeight={windowHeight - 40}
        mainColumnActiveTab={mainColumnActiveTab}
        rows={rows}
        {...rest}
      />
    )
  }
}

MainColumn.propTypes = propTypes

export default compose(injectWindowHeight)(MainColumn)
