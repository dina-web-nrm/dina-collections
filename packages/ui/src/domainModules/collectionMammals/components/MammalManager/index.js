import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { isDirty, reset } from 'redux-form'
import { createSelector } from 'reselect'

import { ColumnLayout, InformationSidebar } from 'coreModules/layout/components'
import layoutSelectors from 'coreModules/layout/globalSelectors'
import {
  createInjectSearch,
  createInjectSearchResult,
} from 'coreModules/search/higherOrderComponents'
import { globalSelectors as searchSelectors } from 'coreModules/search/keyObjectModule'
import sizeSelectors from 'coreModules/size/globalSelectors'
import { SPECIMEN_FILTERS_FORM_NAME } from '../../constants'
import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from '../../keyObjectModule'
import buildQuery from '../../utilities/buildQuery'
import MainColumn from './MainColumn'
import FilterColumn from './FilterColumn'

const main = {
  key: 'main',
  renderColumn: props => <MainColumn {...props} />,
}

const secondaryColumnStyle = { borderLeft: '1px solid #D4D4D5', zIndex: 100 }

const createFilter = createSelector(
  (width = '400px') => width,
  width => {
    return {
      key: 'filter',
      renderColumn: props => <FilterColumn {...props} />,
      style: secondaryColumnStyle,
      width,
    }
  }
)

const createRightSidebar = createSelector(
  width => width,
  width => {
    return {
      key: 'rightSidebar',
      renderColumn: props => <InformationSidebar {...props} />,
      style: secondaryColumnStyle,
      width,
    }
  }
)

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

const mapStateToProps = (state, { searchResultResourceType: resource }) => {
  const specimenSearchState = searchSelectors.get[':resource.searchState'](
    state,
    {
      resource,
    }
  )

  return {
    currentRecordNumber: keyObjectGlobalSelectors.get.currentRecordNumber(
      state
    ),
    filterColumnIsOpen: keyObjectGlobalSelectors.get.filterColumnIsOpen(state),
    filterFormIsDirty: isDirty(SPECIMEN_FILTERS_FORM_NAME)(state),
    isSmall: sizeSelectors.getIsSmall(state),
    mainColumnActiveTab: keyObjectGlobalSelectors.get.mainColumnActiveTab(
      state
    ),
    rightSidebarIsOpen: layoutSelectors.getRightSidebarIsOpen(state),
    totalNumberOfRecords:
      specimenSearchState &&
      specimenSearchState.items &&
      specimenSearchState.items.length,
  }
}

const mapDispatchToProps = {
  reset,
  setCurrentRecordNumber: keyObjectActionCreators.set.currentRecordNumber,
  setFilterColumnIsOpen: keyObjectActionCreators.set.filterColumnIsOpen,
  setMainColumnActiveTab: keyObjectActionCreators.set.mainColumnActiveTab,
}

const propTypes = {
  currentRecordNumber: PropTypes.number,
  filterColumnIsOpen: PropTypes.bool.isRequired,
  filterFormIsDirty: PropTypes.bool.isRequired,
  isSmall: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  mainColumnActiveTab: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
  rightSidebarIsOpen: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  rightSidebarWidth: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  search: PropTypes.func.isRequired,
  setCurrentRecordNumber: PropTypes.func.isRequired,
  setFilterColumnIsOpen: PropTypes.func.isRequired,
  setMainColumnActiveTab: PropTypes.func.isRequired,
  totalNumberOfRecords: PropTypes.number,
}
const defaultProps = {
  currentRecordNumber: 1,
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
    this.handleShowAllRecords = this.handleShowAllRecords.bind(this)
    this.handleResetFilters = this.handleResetFilters.bind(this)
    this.handleSearchSpecimens = this.handleSearchSpecimens.bind(this)
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

  handleResetFilters(event) {
    event.preventDefault()
    this.props.reset(SPECIMEN_FILTERS_FORM_NAME)
  }

  handleSearchSpecimens(event, filterValues = {}) {
    event.preventDefault()

    this.props.search({ query: buildQuery(filterValues) }).then(() => {
      this.props.setCurrentRecordNumber(1)
    })
  }

  handleShowAllRecords(event) {
    event.preventDefault()
    this.props.reset(SPECIMEN_FILTERS_FORM_NAME)
    this.props.search({ query: buildQuery({}) }).then(() => {
      this.props.setCurrentRecordNumber(1)
    })
  }

  handleToggleFilters(event) {
    event.preventDefault()
    this.props.setFilterColumnIsOpen(!this.props.filterColumnIsOpen)
  }

  handleOpenNewRecordForm(event) {
    this.props.setFilterColumnIsOpen(false)
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
      filterFormIsDirty,
      mainColumnActiveTab,
      totalNumberOfRecords,
    } = this.props

    const isNewRecordView = mainColumnActiveTab === 'newRecord'
    const showSelectNextRecordButton =
      !isNewRecordView && currentRecordNumber !== totalNumberOfRecords
    const showSelectPreviousRecordButton =
      !isNewRecordView && currentRecordNumber !== 1

    return (
      <ColumnLayout
        columns={this.getColumns()}
        currentRecordNumber={currentRecordNumber}
        mainColumnActiveTab={mainColumnActiveTab}
        onExportCsv={this.handleExportToCsv}
        onFormTabClick={!isNewRecordView && this.handleOpenNewRecordForm}
        onOpenNewRecordForm={!isNewRecordView && this.handleOpenNewRecordForm}
        onResetFilters={this.handleResetFilters}
        onSearchSpecimens={this.handleSearchSpecimens}
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
        onShowAllRecords={filterFormIsDirty && this.handleShowAllRecords}
        onTableTabClick={isNewRecordView && this.handleOpenTableView}
        onToggleFilters={!isNewRecordView && this.handleToggleFilters}
        totalNumberOfRecords={totalNumberOfRecords}
      />
    )
  }
}

MammalManager.propTypes = propTypes
MammalManager.defaultProps = defaultProps

export default compose(
  createInjectSearch(),
  createInjectSearchResult({
    resource: 'searchSpecimen',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(MammalManager)
