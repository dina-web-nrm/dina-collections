import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

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
} from 'coreModules/resourceManager/higherOrderComponents'
import {
  globalSelectors as keyObjectGlobalSelectors,
  actionCreators as keyObjectActionCreators,
} from 'coreModules/resourceManager/keyObjectModule'
import { waitForOtherSearchesToFinish } from 'coreModules/resourceManager/utilities'

const { get } = keyObjectGlobalSelectors

const mapStateToProps = (
  state,
  { allTableColumnFieldPaths, managerScope, resource, searchResource }
) => {
  // TODO: const resource = searchResource

  return {
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
  // baseTreeFilter: PropTypes.object,
  buildFilterQuery: PropTypes.func.isRequired,
  enableTableColumnSorting: PropTypes.bool.isRequired,
  excludeRootNode: PropTypes.bool.isRequired,
  // fetchItemById: PropTypes.func.isRequired,
  focusedItemId: PropTypes.string,
  // initialItemId: PropTypes.string,
  // itemFetchOptions: PropTypes.object,
  // itemsObject: PropTypes.object.isRequired,
  // ItemTitle: PropTypes.func,
  managerScope: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  searchInProgress: PropTypes.bool,
  setFocusedItemId: PropTypes.func.isRequired,
  // setTreeBaseItems: PropTypes.func.isRequired,
  // setTreeExpandedIds: PropTypes.func.isRequired,
  setTableListItems: PropTypes.func.isRequired,
  // showAll: PropTypes.bool.isRequired,
  sortOrder: PropTypes.array,
  tableColumnsToSort: PropTypes.array,
  tableListItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      isExpandable: PropTypes.bool.isRequired,
      level: PropTypes.number.isRequired,
    }).isRequired
  ),
  updateUserPreference: PropTypes.func.isRequired,
}
const defaultProps = {
  // baseTreeFilter: {},
  focusedItemId: undefined,
  // initialItemId: undefined,
  // itemFetchOptions: { include: [], relationships: ['children', 'parent'] },
  // ItemTitle: undefined,
  searchInProgress: false,
  sortOrder: [],
  tableColumnsToSort: [],
  tableListItems: [],
}

const createTableModuleWrapper = () => ComposedComponent => {
  class TableModuleWrapper extends Component {
    constructor(props) {
      super(props)
      this.fetchTableItems = this.fetchTableItems.bind(this)
      this.getSearchInProgress = this.getSearchInProgress.bind(this)
      this.handleSaveTableColumnsToSort = this.handleSaveTableColumnsToSort.bind(
        this
      )

      this.shortcuts = [
        {
          command: 'space',
          description: 'Open focused record',
          onPress: props.onFormTabClick,
        },
        {
          command: 'f',
          description: 'Show/hide filters',
          onPress: props.onToggleFilters,
        },
      ]
    }

    componentDidMount() {
      this.fetchTableItems()
    }

    componentDidUpdate(prevProps) {}

    getSearchInProgress() {
      return this.props.searchInProgress
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

    fetchTableItems(filterValues) {
      const {
        buildFilterQuery,
        enableTableColumnSorting,
        excludeRootNode,
        managerScope,
        search,
        setTableListItems,
        sortOrder,
        tableColumnsToSort,
      } = this.props

      return waitForOtherSearchesToFinish(this.getSearchInProgress).then(() => {
        const query = buildFilterQuery({
          excludeRootNode,
          values: filterValues || {},
        })
        return search({
          query,
          sort:
            (enableTableColumnSorting &&
              tableColumnsToSort &&
              tableColumnsToSort.map(({ fieldPath, sort: order }) => {
                return `attributes.${fieldPath}:${order}`
              })) ||
            sortOrder,
          useScroll: false,
        }).then(items => {
          setTableListItems(items, { managerScope })

          return null
        })
      })
    }

    render() {
      const {
        focusedItemId,
        itemFetchOptions,
        ItemTitle,
        managerScope,
        onClickRow,
        resource,
        treeExpandedIds,
        tableListItems,
      } = this.props
      return (
        <React.Fragment>
          <KeyboardShortcuts
            activeInLayer={managerScope}
            shortcuts={this.shortcuts}
          />
          <ComposedComponent
            {...this.props}
            focusedItemId={focusedItemId}
            itemFetchOptions={itemFetchOptions}
            ItemTitle={ItemTitle}
            managerScope={managerScope}
            onClickRow={onClickRow}
            onSaveTableColumnsToSort={this.handleSaveTableColumnsToSort}
            onToggleRow={this.handleToggleRow}
            resource={resource}
            tableListItems={tableListItems}
            treeExpandedIds={treeExpandedIds}
          />
        </React.Fragment>
      )
    }
  }

  TableModuleWrapper.propTypes = propTypes
  TableModuleWrapper.defaultProps = defaultProps

  return compose(
    injectResourceManagerConfig,
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
