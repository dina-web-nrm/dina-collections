import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { isDirty, reset } from 'redux-form'
import { createSelector } from 'reselect'
import { push } from 'react-router-redux'

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

const getMainColumnActiveTab = createSelector(
  url => url,
  url => {
    if (url.includes('edit')) {
      return 'recordEdit'
    } else if (url.includes('create')) {
      return 'recordNew'
    } else if (url.includes('settings')) {
      return 'resultTableSettings'
    }
    return 'resultTable'
  }
)

const mapStateToProps = (
  state,
  { match: { url }, searchResultResourceType: resource }
) => {
  const specimenSearchState = searchSelectors.get[':resource.searchState'](
    state,
    {
      resource,
    }
  )

  return {
    currentTableRowNumber: keyObjectGlobalSelectors.get.currentTableRowNumber(
      state
    ),
    filterColumnIsOpen: keyObjectGlobalSelectors.get.filterColumnIsOpen(state),
    filterFormIsDirty: isDirty(SPECIMEN_FILTERS_FORM_NAME)(state),
    focusedSpecimenId: keyObjectGlobalSelectors.get.focusedSpecimenId(state),
    isSmall: sizeSelectors.getIsSmall(state),
    mainColumnActiveTab: getMainColumnActiveTab(url),
    rightSidebarIsOpen: layoutSelectors.getRightSidebarIsOpen(state),
    totalNumberOfRecords:
      specimenSearchState &&
      specimenSearchState.items &&
      specimenSearchState.items.length,
  }
}

const mapDispatchToProps = {
  push,
  reset,
  setCurrentTableRowNumber: keyObjectActionCreators.set.currentTableRowNumber,
  setFilterColumnIsOpen: keyObjectActionCreators.set.filterColumnIsOpen,
  setFocusedSpecimenId: keyObjectActionCreators.set.focusedSpecimenId,
  setMainColumnActiveTab: keyObjectActionCreators.set.mainColumnActiveTab,
}

const propTypes = {
  currentTableRowNumber: PropTypes.number,
  filterColumnIsOpen: PropTypes.bool.isRequired,
  filterFormIsDirty: PropTypes.bool.isRequired,
  focusedSpecimenId: PropTypes.string,
  isSmall: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  mainColumnActiveTab: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  rightSidebarIsOpen: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  rightSidebarWidth: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  search: PropTypes.func.isRequired,
  setCurrentTableRowNumber: PropTypes.func.isRequired,
  setFilterColumnIsOpen: PropTypes.func.isRequired,
  totalNumberOfRecords: PropTypes.number,
}
const defaultProps = {
  currentTableRowNumber: 1,
  rightSidebarWidth: 300,
  totalNumberOfRecords: undefined,
}

class MammalManager extends Component {
  constructor(props) {
    super(props)

    this.getColumns = this.getColumns.bind(this)
    this.handleExportToCsv = this.handleExportToCsv.bind(this)
    this.handleSetCurrentTableRowNumber = this.handleSetCurrentTableRowNumber.bind(
      this
    )
    this.handleSettingClick = this.handleSettingClick.bind(this)
    this.handleToggleFilters = this.handleToggleFilters.bind(this)
    this.handleOpenNewRecordForm = this.handleOpenNewRecordForm.bind(this)
    this.handleOpenTableView = this.handleOpenTableView.bind(this)
    this.handleOpenEditRecordView = this.handleOpenEditRecordView.bind(this)
    this.handleSelectNextRecord = this.handleSelectNextRecord.bind(this)
    this.handleSelectPreviousRecord = this.handleSelectPreviousRecord.bind(this)
    this.handleShowAllRecords = this.handleShowAllRecords.bind(this)
    this.handleResetFilters = this.handleResetFilters.bind(this)
    this.handleSearchSpecimens = this.handleSearchSpecimens.bind(this)
  }

  getColumns() {
    return getColumns(this.props)
  }

  handleSettingClick(event) {
    if (event) event.preventDefault()
    this.props.push(`/app/specimens/mammals/search/settings`)
  }

  handleSetCurrentTableRowNumber(event, newTableRowNumber) {
    if (event) {
      event.preventDefault()
    }

    const parsedInteger = Number(newTableRowNumber)

    if (Number.isInteger(parsedInteger)) {
      this.props.setCurrentTableRowNumber(parsedInteger)
    }
  }

  handleResetFilters(event) {
    this.handleShowAllRecords(event)
  }

  handleSearchSpecimens(event, filterValues = {}) {
    event.preventDefault()

    this.props.search({ query: buildQuery(filterValues) }).then(() => {
      this.props.setCurrentTableRowNumber(1)
    })
  }

  handleShowAllRecords(event) {
    event.preventDefault()
    this.props.reset(SPECIMEN_FILTERS_FORM_NAME)
    this.props.search({ query: buildQuery({}) }).then(() => {
      this.props.setCurrentTableRowNumber(1)
    })
  }

  handleToggleFilters(event) {
    event.preventDefault()
    this.props.setFilterColumnIsOpen(!this.props.filterColumnIsOpen)
  }

  handleOpenNewRecordForm(event) {
    event.preventDefault()
    this.props.setFilterColumnIsOpen(false)

    this.props.push(`/app/specimens/mammals/create`)
  }

  handleOpenTableView(event) {
    if (event) event.preventDefault()
    this.props.push(`/app/specimens/mammals/search`)
  }

  handleOpenEditRecordView(event) {
    if (event) event.preventDefault()
    const specimenId = this.props.focusedSpecimenId

    if (specimenId) {
      this.props.push(`/app/specimens/mammals/${specimenId}/edit`)
    }
  }

  handleSelectNextRecord(event) {
    this.handleSetCurrentTableRowNumber(
      event,
      this.props.currentTableRowNumber + 1
    )
  }

  handleSelectPreviousRecord(event) {
    this.handleSetCurrentTableRowNumber(
      event,
      this.props.currentTableRowNumber - 1
    )
  }

  /* eslint-disable class-methods-use-this, no-alert */
  handleExportToCsv(event) {
    event.preventDefault()
    window.alert('Not implemented')
  }
  /* eslint-enable class-methods-use-this, no-alert */

  render() {
    const {
      currentTableRowNumber,
      filterFormIsDirty,
      mainColumnActiveTab,
      totalNumberOfRecords,
    } = this.props

    const isNewRecordView = mainColumnActiveTab === 'recordNew'
    const isItemViewOrSettings = mainColumnActiveTab.startsWith('record')
    const isTableView = mainColumnActiveTab === 'resultTable'
    const isTableViewOrSettings = mainColumnActiveTab.startsWith('resultTable')

    const showSelectNextRecordButton =
      !isNewRecordView && currentTableRowNumber !== totalNumberOfRecords
    const showSelectPreviousRecordButton =
      !isNewRecordView && currentTableRowNumber !== 1

    return (
      <ColumnLayout
        columns={this.getColumns()}
        currentTableRowNumber={currentTableRowNumber}
        isItemViewOrSettings={isItemViewOrSettings}
        isTableViewOrSettings={isTableViewOrSettings}
        mainColumnActiveTab={mainColumnActiveTab}
        onExportCsv={isTableView && this.handleExportToCsv}
        onFormTabClick={isTableView && this.handleOpenEditRecordView}
        onOpenNewRecordForm={!isNewRecordView && this.handleOpenNewRecordForm}
        onResetFilters={this.handleResetFilters}
        onSearchSpecimens={this.handleSearchSpecimens}
        onSelectNextRecord={
          showSelectNextRecordButton && this.handleSelectNextRecord
        }
        onSelectPreviousRecord={
          showSelectPreviousRecordButton && this.handleSelectPreviousRecord
        }
        onSetCurrentTableRowNumber={
          !isNewRecordView && this.handleSetCurrentTableRowNumber
        }
        onSettingClick={isTableView && this.handleSettingClick}
        onShowAllRecords={filterFormIsDirty && this.handleShowAllRecords}
        onTableTabClick={!isTableView && this.handleOpenTableView}
        onToggleFilters={!isNewRecordView && this.handleToggleFilters}
        totalNumberOfRecords={totalNumberOfRecords}
      />
    )
  }
}

MammalManager.propTypes = propTypes
MammalManager.defaultProps = defaultProps

export default compose(
  withRouter,
  createInjectSearch(),
  createInjectSearchResult({
    resource: 'searchSpecimen',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(MammalManager)
