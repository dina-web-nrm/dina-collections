import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { ColumnLayout, InformationSidebar } from 'coreModules/layout/components'
import layoutSelectors from 'coreModules/layout/globalSelectors'
import sizeSelectors from 'coreModules/size/globalSelectors'
import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from '../../keyObjectModule'
import MainColumn from './MainColumn'
import FilterColumn from './FilterColumn'

const main = {
  key: 'main',
  renderColumn: props => <MainColumn {...props} />,
  width: undefined,
}

const createFilter = (width = '300px') => {
  return {
    key: 'filter',
    renderColumn: props => <FilterColumn {...props} />,
    width,
  }
}

const createRightSidebar = width => {
  return {
    key: 'rightSidebar',
    renderColumn: props => <InformationSidebar {...props} />,
    width,
  }
}

const getColumns = createSelector(
  ({ filterColumnIsOpen }) => filterColumnIsOpen,
  ({ isSmall }) => isSmall,
  ({ rightSidebarIsOpen }) => rightSidebarIsOpen,
  ({ rightSidebarWidth }) => rightSidebarWidth,
  (filterColumnIsOpen, isSmall, rightSidebarIsOpen, rightSidebarWidth) => {
    const columns = [main]
    if (filterColumnIsOpen) {
      if (isSmall) {
        return [createFilter('100%')]
      }
      columns.push(createFilter())
    }

    if (rightSidebarIsOpen) {
      if (isSmall) {
        return [createRightSidebar('100%')]
      }
      columns.push(
        createRightSidebar(rightSidebarWidth && `${rightSidebarWidth}px`)
      )
    }

    return columns
  }
)

const mapStateToProps = state => {
  return {
    activeTab: keyObjectGlobalSelectors.get.activeTab(state),
    currentRecordNumber: keyObjectGlobalSelectors.get.currentRecordNumber(
      state
    ),
    filterColumnIsOpen: keyObjectGlobalSelectors.get.filterColumnIsOpen(state),
    isSmall: sizeSelectors.getIsSmall(state),
    mainColumnViewKey: keyObjectGlobalSelectors.get.mainColumnViewKey(state),
    rightSidebarIsOpen: layoutSelectors.getRightSidebarIsOpen(state),
    totalNumberOfRecords: keyObjectGlobalSelectors.get.totalNumberOfRecords(
      state
    ),
  }
}

const mapDispatchToProps = {
  setActiveTab: keyObjectActionCreators.set.activeTab,
  setCurrentRecordNumber: keyObjectActionCreators.set.currentRecordNumber,
  setFilterColumnIsOpen: keyObjectActionCreators.set.filterColumnIsOpen,
  setMainColumnViewKey: keyObjectActionCreators.set.mainColumnViewKey,
  setTotalNumberOfRecords: keyObjectActionCreators.set.totalNumberOfRecords,
}

const propTypes = {
  activeTab: PropTypes.string.isRequired,
  currentRecordNumber: PropTypes.number,
  filterColumnIsOpen: PropTypes.bool.isRequired,
  isSmall: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  mainColumnViewKey: PropTypes.string.isRequired,
  rightSidebarIsOpen: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  rightSidebarWidth: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  setActiveTab: PropTypes.func.isRequired,
  setCurrentRecordNumber: PropTypes.func.isRequired,
  setFilterColumnIsOpen: PropTypes.func.isRequired,
  setMainColumnViewKey: PropTypes.func.isRequired,
  // setTotalNumberOfRecords: PropTypes.func.isRequired,
  totalNumberOfRecords: PropTypes.number,
}
const defaultProps = {
  currentRecordNumber: undefined,
  rightSidebarWidth: 300,
  totalNumberOfRecords: undefined,
}

class MammalManager extends Component {
  constructor(props) {
    super(props)

    this.getColumns = this.getColumns.bind(this)
    this.handleExportToCsv = this.handleExportToCsv.bind(this)
    this.handleTabClick = this.handleTabClick.bind(this)
    this.handleSetMainColumnViewKey = this.handleSetMainColumnViewKey.bind(this)
    this.handleSetCurrentRecordNumber = this.handleSetCurrentRecordNumber.bind(
      this
    )
    this.handleSettingClick = this.handleSettingClick.bind(this)
    this.handleToggleFilters = this.handleToggleFilters.bind(this)
    this.handleOpenNewRecordForm = this.handleOpenNewRecordForm.bind(this)
    this.handleOpenTableView = this.handleOpenTableView.bind(this)
    this.handleOpenItemView = this.handleOpenItemView.bind(this)
    this.handleSelectNextRecord = this.handleSelectNextRecord.bind(this)
    this.handleSelectPreviousRecord = this.handleSelectPreviousRecord.bind(this)
  }

  getColumns() {
    return getColumns(this.props)
  }

  handleExportToCsv(event) {
    this.handleSetMainColumnViewKey(event, 'exportToCsv')
  }

  handleSettingClick(event) {
    this.handleSetMainColumnViewKey(event, 'settings')
  }

  handleTabClick(event, tab) {
    event.preventDefault()
    this.props.setActiveTab(tab)
  }

  handleSetMainColumnViewKey(event, key) {
    event.preventDefault()
    this.props.setMainColumnViewKey(key)
  }

  handleSetCurrentRecordNumber(event, newRecordNumber) {
    if (event) {
      event.preventDefault()
    }

    const parsedInteger = Number(newRecordNumber)

    if (Number.isInteger(parsedInteger)) {
      this.props.setCurrentRecordNumber(parsedInteger)
    }
  }

  handleToggleFilters(event) {
    event.preventDefault()
    this.props.setFilterColumnIsOpen(!this.props.filterColumnIsOpen)
  }

  handleOpenNewRecordForm(event) {
    this.handleSetMainColumnViewKey(event, 'newRecord')
  }

  handleOpenTableView(event) {
    this.handleSetMainColumnViewKey(event, 'table')
  }

  handleOpenItemView(event) {
    this.handleSetMainColumnViewKey(event, 'item')
  }

  handleSelectNextRecord(event) {
    this.handleSetCurrentRecordNumber(event, this.props.currentRecordNumber + 1)
  }

  handleSelectPreviousRecord(event) {
    this.handleSetCurrentRecordNumber(event, this.props.currentRecordNumber - 1)
  }

  render() {
    const {
      activeTab,
      currentRecordNumber,
      mainColumnViewKey,
      totalNumberOfRecords,
    } = this.props

    const lastRecordNumber = totalNumberOfRecords // TODO: check first selectedNumberOfRecords
    const isNewRecordView = mainColumnViewKey === 'newRecord'
    const showSelectNextRecordButton =
      !isNewRecordView && currentRecordNumber !== lastRecordNumber
    const showSelectPreviousRecordButton =
      !isNewRecordView && currentRecordNumber !== 1
    const showAllRecordsButton = !isNewRecordView // TODO: add condition that no filters are applied

    return (
      <ColumnLayout
        activeTab={activeTab}
        columns={this.getColumns()}
        currentRecordNumber={currentRecordNumber}
        mainColumnViewKey={mainColumnViewKey}
        onExportCsv={this.handleExportToCsv}
        onOpenNewRecordForm={!isNewRecordView && this.handleOpenNewRecordForm}
        onSelectNextRecord={
          showSelectNextRecordButton && this.handleSelectNextRecord
        }
        onSelectPreviousRecord={
          showSelectPreviousRecordButton && this.handleSelectPreviousRecord
        }
        onSetCurrentRecordNumber={
          !isNewRecordView && this.handleSetCurrentRecordNumber
        }
        onShowAllRecords={showAllRecordsButton && this.handleShowAllRecords}
        onSettingClick={this.handleSettingClick}
        onTabClick={this.handleTabClick}
        onToggleFilters={!isNewRecordView && this.handleToggleFilters}
        totalRecords={totalNumberOfRecords}
      />
    )
  }
}

MammalManager.propTypes = propTypes
MammalManager.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  MammalManager
)
