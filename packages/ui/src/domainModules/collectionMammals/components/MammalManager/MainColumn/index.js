import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { createSelector } from 'reselect'

import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import { RecordNavigationBar } from 'coreModules/resourceManager/components'

import CreateSpecimen from './CreateSpecimen'
import EditSpecimen from './EditSpecimen'
import ResultOptionsBar from './ResultOptionsBar'
import ResultTableSettings from './ResultTableSettings'
import ResultTableView from './ResultTableView'

const recordNavigationHeight = emToPixels(4.25)
const recordNavigation = {
  height: `${recordNavigationHeight}px`,
  key: 'recordNavigation',
  renderRow: props => {
    const isCreateItemActive = props.mainColumnActiveTab === 'recordNew' // eslint-disable-line react/prop-types

    return (
      <RecordNavigationBar
        {...props}
        createItemActive={isCreateItemActive}
        disabled={isCreateItemActive}
      />
    )
  },
}

const recordOptionsHeight = emToPixels(3.625)
const recordOptions = {
  height: `${recordOptionsHeight}px`,
  key: 'recordOptions',
  renderRow: props => <ResultOptionsBar {...props} />,
  style: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
}

/* eslint-disable react/prop-types */
const recordNew = {
  key: 'recordNew',
  renderRow: ({ availableHeight, ...rest }) => {
    return (
      <CreateSpecimen
        {...rest}
        availableHeight={
          availableHeight - recordNavigationHeight - recordOptionsHeight
        }
      />
    )
  },
  style: { overflow: 'auto' },
}
const recordEdit = {
  key: 'recordEdit',
  renderRow: ({ availableHeight, ...rest }) => {
    return (
      <EditSpecimen
        {...rest}
        availableHeight={
          availableHeight - recordNavigationHeight - recordOptionsHeight
        }
      />
    )
  },
  style: { overflow: 'auto' },
}
const resultTable = {
  key: 'resultTable',
  renderRow: ({ availableHeight, currentTableRowNumber, ...rest }) => {
    return (
      <div className="ui fluid dina background" style={{ marginTop: '-1px' }}>
        <ResultTableView
          {...rest}
          availableHeight={
            availableHeight - recordNavigationHeight - recordOptionsHeight
          }
          currentTableRowNumber={currentTableRowNumber}
        />
      </div>
    )
  },
}
const resultTableSettings = {
  key: 'resultTableSettings',
  renderRow: ({ onTableTabClick, ...rest }) => {
    return (
      <div className="ui fluid dina background" style={{ padding: '20px' }}>
        <ResultTableSettings {...rest} onTableTabClick={onTableTabClick} />
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
      case 'recordEdit': {
        rows.push(recordEdit)
        break
      }
      case 'recordNew': {
        rows.push(recordNew)
        break
      }
      case 'resultTableSettings': {
        rows.push(resultTableSettings)
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
        {...rest}
        availableHeight={windowHeight - emToPixels(3.4375)}
        mainColumnActiveTab={mainColumnActiveTab}
        rows={getRows(mainColumnActiveTab)}
      />
    )
  }
}

MainColumn.propTypes = propTypes

export default compose(withRouter, injectWindowHeight)(MainColumn)
