import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { createSelector } from 'reselect'

import { RowLayout } from 'coreModules/layout/components'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import CreateSpecimen from '../../CreateSpecimen'
import EditSpecimen from '../../EditSpecimen'
import ConfigureTable from './ConfigureTable'
import RecordNavigationBar from './RecordNavigationBar'
import ResultOptionsBar from './ResultOptionsBar'
import ResultTableView from './ResultTableView'

const recordNavigationHeight = 100
const recordNavigation = {
  height: `${recordNavigationHeight}px`,
  key: 'recordNavigation',
  renderRow: props => <RecordNavigationBar {...props} />,
}

const recordOptionsHeight = 43
const recordOptions = {
  height: `${recordOptionsHeight}px`,
  key: 'recordOptions',
  renderRow: props => <ResultOptionsBar {...props} />,
}

/* eslint-disable react/prop-types */
const newRecord = {
  key: 'newRecord',
  renderRow: () => {
    return (
      <div className="ui fluid dina background" style={{ padding: '20px' }}>
        <CreateSpecimen />
      </div>
    )
  },
  style: { overflow: 'auto' },
}
const editRecord = {
  key: 'editRecord',
  renderRow: () => {
    return (
      <div className="ui fluid dina background" style={{ padding: '20px' }}>
        <EditSpecimen />
      </div>
    )
  },
  style: { overflow: 'auto' },
}
const resultTable = {
  key: 'resultTable',
  renderRow: props => {
    return (
      <div className="ui fluid dina background" style={{ marginTop: '-1px' }}>
        <ResultTableView
          availableHeight={
            props.availableHeight - recordNavigationHeight - recordOptionsHeight
          }
          currentTableRowNumber={props.currentTableRowNumber}
        />
      </div>
    )
  },
}
const configureTable = {
  key: 'configureTable',
  renderRow: props => {
    return (
      <div className="ui fluid dina background" style={{ padding: '20px' }}>
        <ConfigureTable onTableTabClick={props.onTableTabClick} />
      </div>
    )
  },
  style: { overflow: 'auto' },
}
/* eslint-enable react/prop-types */

const getRows = createSelector(
  mainColumnActiveTab => mainColumnActiveTab,
  mainColumnActiveTab => {
    const rows = [recordNavigation, recordOptions]

    switch (mainColumnActiveTab) {
      case 'configureTable': {
        rows.push(configureTable)
        break
      }
      case 'editRecord': {
        rows.push(editRecord)
        break
      }
      case 'newRecord': {
        rows.push(newRecord)
        break
      }
      case 'resultTable': {
        rows.push(resultTable)
        break
      }
      default: {
        break
      }
    }

    return rows
  }
)

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
        rows={getRows(mainColumnActiveTab)}
        {...rest}
      />
    )
  }
}

MainColumn.propTypes = propTypes

export default compose(injectWindowHeight)(MainColumn)
