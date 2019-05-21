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
    focusedItemId: get[':managerScope.focusedItemId'](state, {
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
  setFocusedItemId: keyObjectActionCreators.set[':managerScope.focusedItemId'],
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
  managerScope: PropTypes.string.isRequired,
  navigateEdit: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  searchInProgress: PropTypes.bool,
  setFocusedItemId: PropTypes.func.isRequired,
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
      this.fetchTableItems({ ignoreFilters: true })
    }

    fetchTableItems({ ignoreFilters = false } = {}) {
      const {
        buildFilterQuery,
        enableTableColumnSorting,
        excludeRootNode,
        filterValues,
        focusedItemId,
        managerScope,
        search,
        setTableListItems,
        setFocusedItemId,
        sortOrder,
        tableColumnsToSort,
      } = this.props
      console.log('filterValues', filterValues)
      return waitForOtherSearchesToFinish(this.getSearchInProgress).then(() => {
        const query = buildFilterQuery({
          // excludeRootNode, // TODO: add excludeRootNode
          values: ignoreFilters ? {} : filterValues,
        })
        return search({
          query,
          sort:
            (enableTableColumnSorting &&
              tableColumnsToSort.length > 0 &&
              tableColumnsToSort.map(({ fieldPath, sort: order }) => {
                return `attributes.${fieldPath}:${order}`
              })) ||
            sortOrder,
          useScroll: false,
        }).then(items => {
          setTableListItems(items, { managerScope })

          const firstItemId = objectPath.get(items, '0.id')

          if (!focusedItemId && firstItemId) {
            setFocusedItemId(firstItemId, { managerScope })
          }

          return null
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
