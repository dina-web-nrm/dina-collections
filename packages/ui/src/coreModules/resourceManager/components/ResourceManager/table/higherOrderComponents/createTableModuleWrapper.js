import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import objectPath from 'object-path'

import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import { globalSelectors as searchSelectors } from 'coreModules/search/keyObjectModule'
import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'
import {
  actionCreators as userActionCreators,
  globalSelectors as userSelectors,
} from 'coreModules/user'

import resourceManagerSelectors from 'coreModules/resourceManager/globalSelectors'
import {
  createFocusRow,
  injectFocusedItemId,
  injectResourceManagerConfig,
  injectResourceManagerNavigation,
} from 'coreModules/resourceManager/higherOrderComponents'
import {
  globalSelectors as keyObjectGlobalSelectors,
  actionCreators as keyObjectActionCreators,
} from 'coreModules/resourceManager/keyObjectModule'
import {
  getTableWidth,
  waitForOtherSearchesToFinish,
} from 'coreModules/resourceManager/utilities'

const { get } = keyObjectGlobalSelectors

const mapStateToProps = (
  state,
  { allTableColumnFieldPaths, managerScope, searchResource }
) => {
  const resource = searchResource

  return {
    filterValues: getFormValues(`${searchResource}Filter`)(state),
    hasAppliedFilter: get[':managerScope.hasAppliedFilter'](state, {
      managerScope,
    }),
    resource,
    searchInProgress: searchSelectors.get[':resource.searchInProgress'](state, {
      resource,
    }),
    tableColumnsToShow:
      userSelectors.getUserPreferencesTableColumnsToShow(state, { resource }) ||
      allTableColumnFieldPaths,
    tableColumnsToSort: userSelectors.getUserPreferencesTableColumnsToSort(
      state,
      { resource }
    ),
    tableListItems: get[':managerScope.tableListItems'](state, {
      managerScope,
    }),
  }
}

const mapDispatchToProps = {
  setHasAppliedFilter:
    keyObjectActionCreators.set[':managerScope.hasAppliedFilter'],
  setTableListItems:
    keyObjectActionCreators.set[':managerScope.tableListItems'],
  updateUserPreference: userActionCreators.updateUserPreference,
}

const propTypes = {
  buildFilterQuery: PropTypes.func.isRequired,
  enableTableColumnSorting: PropTypes.bool.isRequired,
  excludeRootNode: PropTypes.bool.isRequired,
  filterValues: PropTypes.object,
  focusedItemId: PropTypes.string,
  focusItemIdWhenLoaded: PropTypes.string,
  hasAppliedFilter: PropTypes.bool,
  managerScope: PropTypes.string.isRequired,
  navigateEdit: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  searchInProgress: PropTypes.bool,
  setFocusedItemId: PropTypes.func.isRequired,
  setFocusItemIdWhenLoaded: PropTypes.func.isRequired,
  setHasAppliedFilter: PropTypes.func.isRequired,
  setTableListItems: PropTypes.func.isRequired,
  sortOrder: PropTypes.array,
  tableBatchFetchOptions: PropTypes.object,
  tableColumnsToSort: PropTypes.array,
  tableListItems: PropTypes.array,
  toggleFilter: PropTypes.func.isRequired,
  updateUserPreference: PropTypes.func.isRequired,
}
const defaultProps = {
  filterValues: {},
  focusedItemId: undefined,
  focusItemIdWhenLoaded: undefined,
  hasAppliedFilter: true,
  searchInProgress: false,
  sortOrder: [],
  tableBatchFetchOptions: {},
  tableColumnsToSort: [],
  tableListItems: [],
}

const createTableModuleWrapper = () => ComposedComponent => {
  class TableModuleWrapper extends Component {
    constructor(props) {
      super(props)
      this.fetchTableItems = this.fetchTableItems.bind(this)
      this.getSearchInProgress = this.getSearchInProgress.bind(this)
      this.handleOpenFocusedItem = this.handleOpenFocusedItem.bind(this)
      this.handleSaveTableColumnsToSort = this.handleSaveTableColumnsToSort.bind(
        this
      )
      this.handleShowAllRecords = this.handleShowAllRecords.bind(this)

      this.shortcuts = [
        {
          command: 'space',
          description: 'Open focused record',
          onPress: this.handleOpenFocusedItem,
        },
        {
          command: 'f',
          description: 'Show/hide filters',
          onPress: props.toggleFilter,
        },
      ]
    }

    getSearchInProgress() {
      return this.props.searchInProgress
    }

    handleOpenFocusedItem() {
      const { focusedItemId, navigateEdit } = this.props

      if (focusedItemId) {
        navigateEdit(focusedItemId)
      }
    }

    handleSaveTableColumnsToSort(columnsToSort) {
      const { resource, updateUserPreference } = this.props

      return updateUserPreference(
        `${resource}TableColumnsToSort`,
        columnsToSort
      ).then(() => {
        return this.fetchTableItems()
      })
    }

    handleShowAllRecords() {
      const { hasAppliedFilter, managerScope, setHasAppliedFilter } = this.props

      if (hasAppliedFilter) {
        setHasAppliedFilter(false, { managerScope })
      }

      return this.fetchTableItems({ ignoreFilters: true })
    }

    fetchTableItems({ ignoreFilters, useInitialFilters } = {}) {
      const {
        buildFilterQuery,
        enableTableColumnSorting,
        focusedItemId,
        focusItemIdWhenLoaded,
        managerScope,
        search,
        setTableListItems,
        setFocusedItemId,
        setFocusItemIdWhenLoaded,
        sortOrder: defaultSortOrder,
        tableColumnsToSort,
      } = this.props

      return waitForOtherSearchesToFinish(this.getSearchInProgress).then(() => {
        const { query } = buildFilterQuery({
          ignoreFilters,
          useInitialFilters,
        })

        const userSortOrder =
          enableTableColumnSorting &&
          tableColumnsToSort.length > 0 &&
          tableColumnsToSort.map(({ fieldPath, sort: order }) => {
            return `attributes.${fieldPath}:${order}`
          })

        return search({
          query,
          sort: userSortOrder || defaultSortOrder,
          useScroll: false,
        }).then(items => {
          setTableListItems(items, { managerScope })

          const firstItemId = objectPath.get(items, '0.id')

          if (focusItemIdWhenLoaded) {
            setFocusedItemId(focusItemIdWhenLoaded)
            setFocusItemIdWhenLoaded(null)
          } else if (!focusedItemId && firstItemId) {
            setFocusedItemId(firstItemId)
          }

          return items
        })
      })
    }

    render() {
      const { managerScope } = this.props

      return (
        <React.Fragment>
          <KeyboardShortcuts
            activeInLayer={managerScope}
            shortcuts={this.shortcuts}
          />
          <ComposedComponent
            {...this.props}
            fetchTableItems={this.fetchTableItems}
            getTableWidth={getTableWidth}
            onSaveTableColumnsToSort={this.handleSaveTableColumnsToSort}
            onShowAllRecords={this.handleShowAllRecords}
            onToggleRow={this.handleToggleRow}
          />
        </React.Fragment>
      )
    }
  }

  TableModuleWrapper.propTypes = propTypes
  TableModuleWrapper.defaultProps = defaultProps

  return compose(
    injectResourceManagerConfig,
    injectResourceManagerNavigation,
    injectFocusedItemId,
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    createFocusRow({
      itemsSelector: get[':managerScope.tableListItems'],
      rowSelector: resourceManagerSelectors.getCurrentTableRowNumber,
    }),
    createInjectSearch({
      includeFields: ['id'],
      storeSearchResult: false,
    })
  )(TableModuleWrapper)
}

export default createTableModuleWrapper
