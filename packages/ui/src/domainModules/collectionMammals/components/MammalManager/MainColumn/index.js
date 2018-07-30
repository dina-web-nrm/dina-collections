import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { RowLayout } from 'coreModules/layout/components'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import CreateSpecimen from '../../CreateSpecimen'
import RecordNavigationBar from './RecordNavigationBar'
import ResultOptionsBar from './ResultOptionsBar'
import ResultTableView from './ResultTableView'

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
    return (
      <div className="ui fluid dina background" style={{ padding: '20px' }}>
        <ResultTableView />
      </div>
    )
  },
  style: { overflow: 'auto' },
}

const recordNavigation = {
  height: '100px',
  key: 'recordNavigation',
  renderRow: props => <RecordNavigationBar {...props} />,
}

const recordOptions = {
  height: '43px',
  key: 'recordOptions',
  renderRow: props => <ResultOptionsBar {...props} />,
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
