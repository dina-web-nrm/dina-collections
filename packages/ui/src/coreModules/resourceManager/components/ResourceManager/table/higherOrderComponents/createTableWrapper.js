import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import objectPath from 'object-path'

import createLog from 'utilities/log'
import { createGetResourceCount } from 'coreModules/crud/higherOrderComponents'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import { globalSelectors as searchSelectors } from 'coreModules/search/keyObjectModule'
import updateUserPreferenceAC from 'coreModules/user/actionCreators/updateUserPreference'
import userSelectors from 'coreModules/user/globalSelectors'

import resourceManagerSelectors from 'coreModules/resourceManager/globalSelectors'
import {
  globalSelectors as keyObjectGlobalSelectors,
  actionCreators as keyObjectActionCreators,
} from 'coreModules/resourceManager/keyObjectModule'
import {
  createFocusRow,
  injectFocusedItemId,
  injectResourceManagerConfig,
  injectResourceManagerNavigation,
} from '../../shared/higherOrderComponents'
import {
  getTableWidth,
  waitForOtherSearchesToFinish,
} from '../../shared/utilities'

const log = createLog('resourceManager:table:createTableWrapper')

const { get } = keyObjectGlobalSelectors

const mapStateToProps = (
  state,
  { allTableColumnFieldPaths, filterFormName, managerScope, searchResource }
) => {
  const resource = searchResource

  return {
    filterFormValues: getFormValues(filterFormName)(state),
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
  updateUserPreference: updateUserPreferenceAC,
}

const propTypes = {
  buildFilterQuery: PropTypes.func.isRequired,
  enableTableColumnSorting: PropTypes.bool.isRequired,
  filterFormName: PropTypes.string.isRequired,
  filterFormValues: PropTypes.object,
  focusedItemId: PropTypes.string,
  focusItemIdWhenLoaded: PropTypes.string,
  hasAppliedFilter: PropTypes.bool,
  initialFilterValues: PropTypes.object.isRequired,
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
  tableBatchFetchOptions: PropTypes.object.isRequired,
  tableColumnsToShow: PropTypes.array.isRequired,
  tableColumnsToSort: PropTypes.array,
  tableListItems: PropTypes.array,
  toggleFilter: PropTypes.func.isRequired,
  updateUserPreference: PropTypes.func.isRequired,
}
const defaultProps = {
  filterFormValues: {},
  focusedItemId: undefined,
  focusItemIdWhenLoaded: undefined,
  hasAppliedFilter: true,
  searchInProgress: false,
  sortOrder: [],
  tableColumnsToSort: [],
  tableListItems: [],
}

const createTableWrapper = () => ComposedComponent => {
  class TableModuleWrapper extends Component {
    constructor(props) {
      super(props)
      this.fetchTableItems = this.fetchTableItems.bind(this)
      this.getSearchInProgress = this.getSearchInProgress.bind(this)
      this.handleSaveTableColumnsToShow = this.handleSaveTableColumnsToShow.bind(
        this
      )
      this.handleSaveTableColumnsToSort = this.handleSaveTableColumnsToSort.bind(
        this
      )
      this.handleShowAllRecords = this.handleShowAllRecords.bind(this)
    }

    getSearchInProgress() {
      return this.props.searchInProgress
    }

    handleSaveTableColumnsToShow(columnsToShow) {
      const { resource, updateUserPreference } = this.props

      return updateUserPreference(
        `${resource}TableColumnsToShow`,
        columnsToShow
      )
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
        filterFormValues,
        initialFilterValues,
        managerScope,
        search,
        setTableListItems,
        setFocusedItemId,
        setFocusItemIdWhenLoaded,
        sortOrder: defaultSortOrder,
        tableColumnsToSort,
      } = this.props

      return waitForOtherSearchesToFinish(this.getSearchInProgress).then(() => {
        let filterValues = filterFormValues
        if (ignoreFilters) {
          filterValues = {}
        } else if (useInitialFilters) {
          filterValues = initialFilterValues || {}
        }

        const { query } = buildFilterQuery({
          formValues: filterValues,
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

          const { focusedItemId, focusItemIdWhenLoaded } = this.props

          if (focusItemIdWhenLoaded) {
            setFocusedItemId(focusItemIdWhenLoaded)
            setFocusItemIdWhenLoaded(null)
          } else if (firstItemId && !focusedItemId) {
            setFocusedItemId(firstItemId)
          } else if (firstItemId && focusedItemId) {
            const focusedItemInItems = items.find(
              item => item.id === focusedItemId
            )

            if (!focusedItemInItems) {
              setFocusedItemId(firstItemId)
            }
          }

          return items
        })
      })
    }

    render() {
      log.render()

      return (
        <ComposedComponent
          {...this.props}
          fetchTableItems={this.fetchTableItems}
          getTableWidth={getTableWidth}
          onSaveTableColumnsToShow={this.handleSaveTableColumnsToShow}
          onSaveTableColumnsToSort={this.handleSaveTableColumnsToSort}
          onShowAllRecords={this.handleShowAllRecords}
          onToggleRow={this.handleToggleRow}
        />
      )
    }
  }

  TableModuleWrapper.propTypes = propTypes
  TableModuleWrapper.defaultProps = defaultProps

  return compose(
    injectResourceManagerConfig,
    injectResourceManagerNavigation,
    injectFocusedItemId,
    createGetResourceCount(),
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

export default createTableWrapper
