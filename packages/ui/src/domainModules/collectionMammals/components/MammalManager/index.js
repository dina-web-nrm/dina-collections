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
    currentRecordNumber: keyObjectGlobalSelectors.get.currentRecordNumber(
      state
    ),
    filterColumnIsOpen: keyObjectGlobalSelectors.get.filterColumnIsOpen(state),
    isSmall: sizeSelectors.getIsSmall(state),
    mainColumnActiveTab: keyObjectGlobalSelectors.get.mainColumnActiveTab(
      state
    ),
    rightSidebarIsOpen: layoutSelectors.getRightSidebarIsOpen(state),
    totalNumberOfRecords: keyObjectGlobalSelectors.get.totalNumberOfRecords(
      state
    ),
  }
}

const mapDispatchToProps = {
  setCurrentRecordNumber: keyObjectActionCreators.set.currentRecordNumber,
  setFilterColumnIsOpen: keyObjectActionCreators.set.filterColumnIsOpen,
  setMainColumnActiveTab: keyObjectActionCreators.set.mainColumnActiveTab,
  setTotalNumberOfRecords: keyObjectActionCreators.set.totalNumberOfRecords,
}

const propTypes = {
  currentRecordNumber: PropTypes.number,
  filterColumnIsOpen: PropTypes.bool.isRequired,
  isSmall: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  mainColumnActiveTab: PropTypes.string.isRequired,
  rightSidebarIsOpen: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  rightSidebarWidth: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  setCurrentRecordNumber: PropTypes.func.isRequired,
  setFilterColumnIsOpen: PropTypes.func.isRequired,
  setMainColumnActiveTab: PropTypes.func.isRequired,
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
    this.handleSetMainColumnActiveTab = this.handleSetMainColumnActiveTab.bind(
      this
    )
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
    this.handleSetMainColumnActiveTab(event, 'exportToCsv')
  }

  handleSettingClick(event) {
    this.handleSetMainColumnActiveTab(event, 'settings')
  }

  handleSetMainColumnActiveTab(event, key) {
    event.preventDefault()
    this.props.setMainColumnActiveTab(key)
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
    this.handleSetMainColumnActiveTab(event, 'newRecord')
  }

  handleOpenTableView(event) {
    this.handleSetMainColumnActiveTab(event, 'table')
  }

  handleOpenItemView(event) {
    this.handleSetMainColumnActiveTab(event, 'item')
  }

  handleSelectNextRecord(event) {
    this.handleSetCurrentRecordNumber(event, this.props.currentRecordNumber + 1)
  }

  handleSelectPreviousRecord(event) {
    this.handleSetCurrentRecordNumber(event, this.props.currentRecordNumber - 1)
  }

  render() {
    const {
      currentRecordNumber,
      mainColumnActiveTab,
      totalNumberOfRecords,
    } = this.props

    const lastRecordNumber = totalNumberOfRecords // TODO: check first selectedNumberOfRecords

    const isNewRecordView = mainColumnActiveTab === 'newRecord'
    const showSelectNextRecordButton =
      !isNewRecordView && currentRecordNumber !== lastRecordNumber
    const showSelectPreviousRecordButton =
      !isNewRecordView && currentRecordNumber !== 1
    const showAllRecordsButton = !isNewRecordView // TODO: add condition that no filters are applied

    return (
      <ColumnLayout
        columns={this.getColumns()}
        currentRecordNumber={currentRecordNumber}
        mainColumnActiveTab={mainColumnActiveTab}
        onExportCsv={this.handleExportToCsv}
        onFormTabClick={!isNewRecordView && this.handleOpenNewRecordForm}
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
        onSettingClick={this.handleSettingClick}
        onShowAllRecords={showAllRecordsButton && this.handleShowAllRecords}
        onTableTabClick={isNewRecordView && this.handleOpenTableView}
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
