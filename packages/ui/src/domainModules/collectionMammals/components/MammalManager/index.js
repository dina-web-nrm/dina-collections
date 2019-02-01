import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { isDirty, reset, getFormValues } from 'redux-form'
import { createSelector } from 'reselect'
import { push } from 'react-router-redux'
import objectPath from 'object-path'

import { createGetResourceCount } from 'coreModules/crud/higherOrderComponents'
import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'
import { createShortcutLayer } from 'coreModules/keyboardShortcuts/higherOrderComponents'
import { ColumnLayout, InformationSidebar } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import layoutSelectors from 'coreModules/layout/globalSelectors'
import {
  CREATE_SUCCESS,
  DEL_SUCCESS,
} from 'coreModules/resourceManager/constants'
import userSelectors from 'coreModules/user/globalSelectors'
import {
  createInjectSearch,
  createInjectSearchResult,
} from 'coreModules/search/higherOrderComponents'
import { globalSelectors as searchSelectors } from 'coreModules/search/keyObjectModule'
import sizeSelectors from 'coreModules/size/globalSelectors'
import { updateUserPreference } from 'coreModules/user/actionCreators'
import {
  SPECIMEN_FILTERS_FORM_NAME,
  SPECIMENS_MAMMALS_TABLE_COLUMNS,
  SPECIMENS_MAMMALS_TABLE_COLUMNS_SORTING,
} from '../../constants'
import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from '../../keyObjectModule'
import { higherOrderComponents } from './FilterColumn/queryBuilder'
import MainColumn from './MainColumn'
import FilterColumn from './FilterColumn'

const main = {
  key: 'main',
  renderColumn: props => <MainColumn {...props} />,
}

const secondaryColumnStyle = {
  background: 'white',
  borderLeft: '1px solid #D4D4D5',
  zIndex: 100,
}

const createFilter = createSelector(
  (width = emToPixels(25)) => width,
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
  { match: { params, url }, resourceCount, searchResultResourceType: resource }
) => {
  const userPreferences = userSelectors.getUserPreferences(state)
  const tableColumnsToShow =
    (userPreferences && userPreferences[SPECIMENS_MAMMALS_TABLE_COLUMNS]) ||
    undefined
  const tableColumnsToSort =
    (userPreferences &&
      userPreferences[SPECIMENS_MAMMALS_TABLE_COLUMNS_SORTING]) ||
    undefined

  const specimenSearchState = searchSelectors.get[':resource.searchState'](
    state,
    {
      resource,
    }
  )

  const mainColumnActiveTab = getMainColumnActiveTab(url)

  const totalNumberOfRecords = resourceCount
  const numberOfListItems =
    specimenSearchState &&
    specimenSearchState.items &&
    specimenSearchState.items.length

  const currentTableRowNumber = keyObjectGlobalSelectors.get.currentTableRowNumber(
    state
  )

  const isEditRecordView = mainColumnActiveTab === 'recordEdit'
  const isNewRecordView = mainColumnActiveTab === 'recordNew'
  const isItemViewOrSettings = mainColumnActiveTab.startsWith('record')
  const isTableView = mainColumnActiveTab === 'resultTable'
  const isTableViewOrSettings = mainColumnActiveTab.startsWith('resultTable')

  const showSelectNextRecordButton =
    !isNewRecordView && currentTableRowNumber < numberOfListItems
  const showSelectPreviousRecordButton =
    !isNewRecordView && currentTableRowNumber > 1

  const filterFormIsDirty = isDirty(SPECIMEN_FILTERS_FORM_NAME)(state)
  const enableShowAllRecordsButton =
    !isEditRecordView &&
    filterFormIsDirty &&
    numberOfListItems !== totalNumberOfRecords

  return {
    currentTableRowNumber,
    enableShowAllRecordsButton,
    filterColumnIsOpen: keyObjectGlobalSelectors.get.filterColumnIsOpen(state),
    filterValues: getFormValues(SPECIMEN_FILTERS_FORM_NAME)(state),
    focusedSpecimenId: keyObjectGlobalSelectors.get.focusedSpecimenId(state),
    isEditRecordView,
    isItemViewOrSettings,
    isNewRecordView,
    isSmall: sizeSelectors.getIsSmall(state),
    isTableView,
    isTableViewOrSettings,
    mainColumnActiveTab,
    numberOfListItems,
    rightSidebarIsOpen: layoutSelectors.getRightSidebarIsOpen(state),
    showSelectNextRecordButton,
    showSelectPreviousRecordButton,
    specimenId: objectPath.get(params, 'specimenId'),
    tableColumnsToShow,
    tableColumnsToSort,
    totalNumberOfRecords,
  }
}

const mapDispatchToProps = {
  delCurrentTableRowNumber: keyObjectActionCreators.del.currentTableRowNumber,
  delFocusedSpecimenId: keyObjectActionCreators.del.focusedSpecimenId,
  push,
  reset,
  setCurrentTableRowNumber: keyObjectActionCreators.set.currentTableRowNumber,
  setFilterColumnIsOpen: keyObjectActionCreators.set.filterColumnIsOpen,
  setFocusedSpecimenId: keyObjectActionCreators.set.focusedSpecimenId,
  updateUserPreference,
}

const propTypes = {
  currentTableRowNumber: PropTypes.number,
  delCurrentTableRowNumber: PropTypes.func.isRequired,
  delFocusedSpecimenId: PropTypes.func.isRequired,
  enableShowAllRecordsButton: PropTypes.bool.isRequired,
  filterColumnIsOpen: PropTypes.bool.isRequired,
  filterValues: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  focusedSpecimenId: PropTypes.string,
  isEditRecordView: PropTypes.bool.isRequired,
  isItemViewOrSettings: PropTypes.bool.isRequired,
  isNewRecordView: PropTypes.bool.isRequired,
  isSmall: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  isTableView: PropTypes.bool.isRequired,
  isTableViewOrSettings: PropTypes.bool.isRequired,
  mainColumnActiveTab: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  numberOfListItems: PropTypes.number,
  prefetchLimit: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  push: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  rightSidebarIsOpen: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  rightSidebarWidth: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  search: PropTypes.func.isRequired,
  searchResult: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  setCurrentTableRowNumber: PropTypes.func.isRequired,
  setFilterColumnIsOpen: PropTypes.func.isRequired,
  setFocusedSpecimenId: PropTypes.func.isRequired,
  showSelectNextRecordButton: PropTypes.bool.isRequired,
  showSelectPreviousRecordButton: PropTypes.bool.isRequired,
  specimenId: PropTypes.string,
  tableColumnsToSort: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
  totalNumberOfRecords: PropTypes.number,
  updateUserPreference: PropTypes.func.isRequired,
}
const defaultProps = {
  currentTableRowNumber: undefined,
  filterValues: undefined,
  focusedSpecimenId: undefined,
  numberOfListItems: undefined,
  prefetchLimit: 50,
  rightSidebarWidth: emToPixels(25),
  searchResult: undefined,
  specimenId: undefined,
  tableColumnsToSort: undefined,
  totalNumberOfRecords: 0,
}

class MammalManager extends Component {
  constructor(props) {
    super(props)

    this.getColumns = this.getColumns.bind(this)
    this.handleExportToCsv = this.handleExportToCsv.bind(this)
    this.handleInteraction = this.handleInteraction.bind(this)
    this.handleOpenEditRecordView = this.handleOpenEditRecordView.bind(this)
    this.handleOpenNewRecordForm = this.handleOpenNewRecordForm.bind(this)
    this.handleOpenTableView = this.handleOpenTableView.bind(this)
    this.handleResetFilters = this.handleResetFilters.bind(this)
    this.handleSearchSpecimens = this.handleSearchSpecimens.bind(this)
    this.handleSelectNextRecord = this.handleSelectNextRecord.bind(this)
    this.handleSelectPreviousRecord = this.handleSelectPreviousRecord.bind(this)
    this.handleSetCurrentTableRowNumber = this.handleSetCurrentTableRowNumber.bind(
      this
    )
    this.handleSettingClick = this.handleSettingClick.bind(this)
    this.handleShowAllRecords = this.handleShowAllRecords.bind(this)
    this.handleSpecimenIdUpdate = this.handleSpecimenIdUpdate.bind(this)
    this.handleToggleFilters = this.handleToggleFilters.bind(this)

    this.shortcuts = [
      {
        command: 'down',
        description: 'Move focus to next record',
        onPress: this.handleSelectNextRecord,
      },
      {
        command: 'up',
        description: 'Move focus to previous record',
        onPress: this.handleSelectPreviousRecord,
      },
      {
        command: 'n n',
        description: 'Open new record form',
        onPress: this.handleOpenNewRecordForm,
      },
      {
        command: 'n t',
        description: 'Open table view',
        onPress: this.handleOpenTableView,
      },
    ]
  }
  componentWillMount() {
    this.handleSpecimenIdUpdate()
  }

  componentDidMount() {
    this.handleSearchSpecimens(this.props, {
      openTableView: false,
      usePrefetchLimit: true,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (
      objectPath.get(this.props, 'tableColumnsToSort') !==
      objectPath.get(nextProps, 'tableColumnsToSort')
    ) {
      let currentId
      // Need to check that we are not in the edit record view.
      // If not this check the user will be redirected away from a newly created specimen

      if (
        !this.props.isNewRecordView &&
        !this.props.isEditRecordView &&
        nextProps.currentTableRowNumber > 0
      ) {
        const currentSpecimen =
          nextProps.searchResult.items &&
          nextProps.searchResult.items[nextProps.currentTableRowNumber - 1]
        currentId = currentSpecimen.id
      }

      this.handleSearchSpecimens(nextProps, {
        openTableView: false,
        skipFilter: nextProps.isItemViewOrSettings,
        usePrefetchLimit: false,
      }).then(() => {
        if (currentId) {
          const newIndex = this.props.searchResult.items.findIndex(
            ({ id }) => id === currentId
          )

          this.handleSetCurrentTableRowNumber(null, newIndex + 1)
        }
      })
    }

    if (
      objectPath.get(this.props, 'tableColumnsToShow') !==
      objectPath.get(nextProps, 'tableColumnsToShow')
    ) {
      this.handleSearchSpecimens(nextProps, {
        openTableView: true,
        usePrefetchLimit: false,
      })
    }

    if (
      nextProps.isEditRecordView &&
      (this.props.specimenId !== nextProps.specimenId ||
        objectPath.get(this.props, 'searchResult.items') !==
          objectPath.get(nextProps, 'searchResult.items'))
    ) {
      this.handleSpecimenIdUpdate(nextProps)
    }
  }

  getColumns() {
    return getColumns(this.props)
  }

  handleInteraction(type) {
    switch (type) {
      case CREATE_SUCCESS: {
        this.props.updateUserPreference(
          SPECIMENS_MAMMALS_TABLE_COLUMNS_SORTING,
          [{ name: 'idNumeric', sort: 'asc' }]
        )

        break
      }
      case DEL_SUCCESS: {
        setTimeout(() => this.handleSearchSpecimens())
        break
      }
      default: {
        break
      }
    }
  }

  handleSpecimenIdUpdate(props = this.props) {
    const specimenId = objectPath.get(props, 'match.params.specimenId')

    if (specimenId) {
      this.props.setFocusedSpecimenId(specimenId)

      if (objectPath.get(props, 'searchResult.items')) {
        const index = props.searchResult.items.findIndex(
          ({ id }) => id === specimenId
        )

        if (index > -1) {
          this.props.setCurrentTableRowNumber(index + 1)
        }
      }
    }
  }

  handleSetCurrentTableRowNumber(event, newTableRowNumber) {
    if (event) {
      event.preventDefault()
    }

    const { mainColumnActiveTab, match: { path, params } } = this.props

    this.props.setCurrentTableRowNumber(newTableRowNumber)

    const index = newTableRowNumber - 1
    const specimenId = objectPath.get(
      this.props,
      `searchResult.items.${index}.id`
    )

    if (specimenId) {
      if (mainColumnActiveTab === 'recordEdit') {
        return this.props.push(
          path
            .replace(':specimenId', specimenId)
            .replace(':sectionId', params.sectionId)
        )
      }

      return this.props.setFocusedSpecimenId(specimenId)
    }

    return this.props.setFocusedSpecimenId(undefined)
  }

  handleSelectNextRecord(event) {
    const { currentTableRowNumber, numberOfListItems } = this.props

    if (numberOfListItems && currentTableRowNumber < numberOfListItems) {
      this.handleSetCurrentTableRowNumber(event, currentTableRowNumber + 1)
    }
  }

  handleSelectPreviousRecord(event) {
    const { currentTableRowNumber, numberOfListItems } = this.props

    if (numberOfListItems && currentTableRowNumber > 1) {
      this.handleSetCurrentTableRowNumber(event, currentTableRowNumber - 1)
    }
  }

  handleToggleFilters(event) {
    event.preventDefault()
    this.props.setFilterColumnIsOpen(!this.props.filterColumnIsOpen)
  }

  handleSearchSpecimens(
    props = this.props,
    { openTableView = true, skipFilter = false, usePrefetchLimit = true } = {}
  ) {
    if (!props.isTableView && openTableView) {
      this.handleOpenTableView()
    }

    const {
      buildQuery,
      currentTableRowNumber,
      focusedSpecimenId,
      tableColumnsToSort,
      prefetchLimit,
    } = props

    const sort =
      tableColumnsToSort &&
      tableColumnsToSort.map(({ name, sort: order }) => {
        return `attributes.${name}:${order}`
      })

    const { query } = buildQuery()
    return this.props
      .search({
        limit: usePrefetchLimit ? prefetchLimit : 50000,
        query: skipFilter ? {} : query,
        sort,
      })
      .then(items => {
        if (items && items.length) {
          if (
            (!currentTableRowNumber && !focusedSpecimenId) ||
            !items.find(({ id }) => id === focusedSpecimenId)
          ) {
            this.props.setCurrentTableRowNumber(1)
            this.props.setFocusedSpecimenId(items[0].id)
          } else if (items.length < currentTableRowNumber) {
            this.props.setCurrentTableRowNumber(items.length)
            this.props.setFocusedSpecimenId(items[items.length - 1].id)
          }
        } else {
          this.props.delCurrentTableRowNumber()
          this.props.delFocusedSpecimenId()
        }

        const limitReached = items && items.length === prefetchLimit
        if (limitReached) {
          return this.props.search({
            query,
            sort,
          })
        }
        return null
      })
  }

  handleShowAllRecords(event) {
    event.preventDefault()
    this.props.reset(SPECIMEN_FILTERS_FORM_NAME)
    setTimeout(() => this.handleSearchSpecimens())
  }

  handleResetFilters(event) {
    this.handleShowAllRecords(event)
  }

  handleOpenNewRecordForm(event) {
    event.preventDefault()
    this.props.setFilterColumnIsOpen(false)
    this.props.push(`/app/specimens/mammals/create/sections/0`)
  }

  handleOpenTableView(event) {
    if (event) event.preventDefault()
    this.props.push(`/app/specimens/mammals/search`)
  }

  handleOpenEditRecordView(event) {
    if (event) event.preventDefault()

    const specimenId = this.props.focusedSpecimenId
    if (specimenId) {
      this.props.push(`/app/specimens/mammals/${specimenId}/edit/sections/0`)
    }
  }

  /* eslint-disable class-methods-use-this, no-alert */
  handleExportToCsv(event) {
    event.preventDefault()
    window.alert('Not implemented')
  }
  /* eslint-enable class-methods-use-this, no-alert */

  handleSettingClick(event) {
    if (event) event.preventDefault()
    this.props.push(`/app/specimens/mammals/search/settings`)
  }

  render() {
    const {
      currentTableRowNumber,
      enableShowAllRecordsButton,
      focusedSpecimenId,
      isItemViewOrSettings,
      isNewRecordView,
      isTableView,
      isTableViewOrSettings,
      mainColumnActiveTab,
      numberOfListItems,
      showSelectNextRecordButton,
      showSelectPreviousRecordButton,
      totalNumberOfRecords,
    } = this.props

    return (
      <React.Fragment>
        <KeyboardShortcuts
          activeInLayer="mammalManager"
          shortcuts={this.shortcuts}
        />
        <ColumnLayout
          columns={this.getColumns()}
          currentTableRowNumber={currentTableRowNumber}
          focusedItemId={focusedSpecimenId}
          isItemViewOrSettings={isItemViewOrSettings}
          isNewRecordView={isNewRecordView}
          isTableViewOrSettings={isTableViewOrSettings}
          mainColumnActiveTab={mainColumnActiveTab}
          numberOfListItems={numberOfListItems}
          onExportCsv={isTableView && this.handleExportToCsv}
          onFormTabClick={isTableView && this.handleOpenEditRecordView}
          onInteraction={this.handleInteraction}
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
          onShowAllRecords={
            enableShowAllRecordsButton && this.handleShowAllRecords
          }
          onTableTabClick={!isTableView && this.handleOpenTableView}
          onToggleFilters={!isNewRecordView && this.handleToggleFilters}
          totalNumberOfRecords={totalNumberOfRecords}
        />
      </React.Fragment>
    )
  }
}

MammalManager.propTypes = propTypes
MammalManager.defaultProps = defaultProps

export default compose(
  withRouter,
  createGetResourceCount({ resource: 'specimen' }),
  createInjectSearch({
    includeFields: ['id'],
    resource: 'searchSpecimen',
  }),
  createInjectSearchResult({
    resource: 'searchSpecimen',
  }),
  higherOrderComponents.createFormHoc(),
  createShortcutLayer({ layer: 'mammalManager' }),
  connect(mapStateToProps, mapDispatchToProps)
)(MammalManager)
