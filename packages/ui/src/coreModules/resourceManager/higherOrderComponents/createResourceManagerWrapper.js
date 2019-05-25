/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reset as resetActionCreator } from 'redux-form'
import createLog from 'utilities/log'

import capitalizeFirstLetter from 'common/src/stringFormatters/capitalizeFirstLetter'
import crudActionCreators from 'coreModules/crud/actionCreators'
import { createGetResourceCount } from 'coreModules/crud/higherOrderComponents'
import { globalSelectors as searchSelectors } from 'coreModules/search/keyObjectModule'
import userSelectors from 'coreModules/user/globalSelectors'

import {
  globalSelectors as keyObjectGlobalSelectors,
  actionCreators as keyObjectActionCreators,
} from 'coreModules/resourceManager/keyObjectModule'

import { createShortcutLayer } from 'coreModules/keyboardShortcuts/higherOrderComponents'
import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'

import { injectFocusedItemId } from 'coreModules/resourceManager/higherOrderComponents'
import { ResourceManagerConfigProvider } from 'coreModules/resourceManager/contexts/resourceManagerConfig'

const log = createLog('resourceManager:resourceManagerWrapper')

const defaultBuildEditItemHeaders = nestedItem => {
  if (!nestedItem) {
    return {}
  }

  return {
    itemHeader: nestedItem.name,
    itemSubHeader: capitalizeFirstLetter(nestedItem.group),
  }
}

const createResourceManagerWrapper = () => ComposedComponent => {
  const mapStateToProps = (state, { isPicker, resource, resourceCount }) => {
    const totalNumberOfRecords = resourceCount

    const searchResource = `search${capitalizeFirstLetter(resource)}`
    const managerScope = isPicker ? `${resource}Picker` : resource

    const { get } = keyObjectGlobalSelectors
    const treeBaseItems = get[':managerScope.treeBaseItems'](state, {
      managerScope,
    })
    const listItems = get[':managerScope.tableListItems'](state, {
      managerScope,
    })
    const treeListItems = get[':managerScope.treeListItems'](state, {
      managerScope,
    })
    const numberOfListItems = (listItems || []).length

    const expandedIds = get[':managerScope.treeExpandedIds'](state, {
      managerScope,
    })

    const currentTableRowNumber =
      get[':managerScope.currentTableRowNumber'](state, { managerScope }) || 1
    const focusedIndex = currentTableRowNumber - 1
    const nextRowAvailable = currentTableRowNumber < numberOfListItems
    const prevRowAvailable = currentTableRowNumber > 1
    const filterValues = get[':managerScope.listFilterValues'](state, {
      managerScope,
    })
    const focusItemIdWhenLoaded = get[':managerScope.focusItemIdWhenLoaded'](
      state,
      {
        managerScope,
      }
    )
    const userPreferences = userSelectors.getUserPreferences(state)
    const tableColumnsToSort =
      (userPreferences && userPreferences[`${resource}TableColumnsToSort`]) ||
      undefined
    const searchInProgress = searchSelectors.get[':resource.searchInProgress'](
      state,
      { resource }
    )
    return {
      currentTableRowNumber,
      expandedIds,
      filterValues,
      focusedIndex,
      focusItemIdWhenLoaded,
      layer: managerScope,
      listItems,
      managerScope,
      nextRowAvailable,
      numberOfListItems,
      prevRowAvailable,
      searchInProgress,
      searchResource,
      tableColumnsToSort,
      totalNumberOfRecords,
      treeBaseItems,
      treeListItems,
    }
  }

  const mapDispatchToProps = {
    clearNestedCache: crudActionCreators.clearNestedCache,
    clearResourceState: keyObjectActionCreators.del[':managerScope'],
    delfocusItemIdWhenLoaded:
      keyObjectActionCreators.del[':managerScope.focusItemIdWhenLoaded'],
    resetForm: resetActionCreator,
    setBaseItems: keyObjectActionCreators.set[':managerScope.treeBaseItems'],
    setCurrentTableRowNumber:
      keyObjectActionCreators.set[':managerScope.currentTableRowNumber'],
    setExpandedIds:
      keyObjectActionCreators.set[':managerScope.treeExpandedIds'],
    setFilterValues:
      keyObjectActionCreators.set[':managerScope.listFilterValues'],
    setfocusItemIdWhenLoaded:
      keyObjectActionCreators.set[':managerScope.focusItemIdWhenLoaded'],
    setListItems: keyObjectActionCreators.set[':managerScope.listItems'],
    setTreeListItems:
      keyObjectActionCreators.set[':managerScope.treeListItems'],
  }

  const propTypes = {
    // csvExportEnabled: PropTypes.bool,
    // currentTableRowNumber: PropTypes.number.isRequired,
    // delfocusItemIdWhenLoaded: PropTypes.func.isRequired,
    // dispatch: PropTypes.func.isRequired,
    // editItemActive: PropTypes.bool.isRequired,
    // expandedIds: PropTypes.object,
    // filterActive: PropTypes.bool.isRequired,
    // filterValues: PropTypes.object,
    // focusedIndex: PropTypes.number.isRequired,
    // focusItemIdWhenLoaded: PropTypes.string,
    // itemId: PropTypes.string,
    // listItems: PropTypes.array,
    // nestedCacheNamespaces: PropTypes.arrayOf(PropTypes.string),
    // nextRowAvailable: PropTypes.bool.isRequired,
    // numberOTreefListItems: PropTypes.number.isRequired,
    // prevRowAvailable: PropTypes.bool.isRequired,
    // recordNavigationHeight: PropTypes.number,
    // recordOptionsHeight: PropTypes.number,
    // resetForm: PropTypes.func.isRequired,
    // search: PropTypes.func.isRequired,
    // searchInProgress: PropTypes.bool,
    // setBaseItems: PropTypes.func.isRequired,
    // setCurrentTableRowNumber: PropTypes.func.isRequired,
    // setExpandedIds: PropTypes.func.isRequired,
    // setFilterValues: PropTypes.func.isRequired,
    // setfocusItemIdWhenLoaded: PropTypes.func.isRequired,
    // setListItems: PropTypes.func.isRequired,
    // setShowAll: PropTypes.func.isRequired,
    // tableActive: PropTypes.bool.isRequired,
    // tableBatchFetchOptions
    // tableColumnSpecifications
    // tableColumnSpecifications: PropTypes.array.isRequired,
    // tableColumnsToSort: PropTypes.array,
    // tableSearch: PropTypes.func,
    // totalNumberOfRecords: PropTypes.number,
    // treeActive: PropTypes.bool.isRequired,
    // treeBaseItems: PropTypes.array,
    baseTreeFilter: PropTypes.object,
    buildEditItemHeaders: PropTypes.func,
    buildFilterQuery: PropTypes.func.isRequired,
    clearNestedCache: PropTypes.func.isRequired,
    clearResourceState: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    enableTableColumnSorting: PropTypes.bool,
    excludeRootNode: PropTypes.bool,
    focusedItemId: PropTypes.string,
    initialFilterValues: PropTypes.object,
    initialItemId: PropTypes.string,
    isPicker: PropTypes.bool,
    managerScope: PropTypes.string.isRequired,
    navigateCreate: PropTypes.func.isRequired,
    navigateEdit: PropTypes.func.isRequired,
    navigateFilter: PropTypes.func.isRequired,
    navigateTable: PropTypes.func.isRequired,
    onInteraction: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
    searchResource: PropTypes.string.isRequired,
    setFocusedItemId: PropTypes.func.isRequired,
    sortOrder: PropTypes.array,
    treeEnabled: PropTypes.bool,
    treeItemFetchOptions: PropTypes.object,
  }

  const defaultProps = {
    baseTreeFilter: {},
    buildEditItemHeaders: defaultBuildEditItemHeaders,
    // csvExportEnabled: true,
    enableTableColumnSorting: false,
    excludeRootNode: false,
    // expandedIds: {},
    // filterValues: undefined,
    focusedItemId: undefined,
    // focusItemIdWhenLoaded: undefined,
    initialFilterValues: undefined,
    initialItemId: undefined,
    isPicker: false,
    // itemId: undefined,
    // listItems: [],
    // nestedCacheNamespaces: undefined,
    // recordNavigationHeight: emToPixels(4.25),
    // recordOptionsHeight: emToPixels(3.5625),
    // searchInProgress: false,
    sortOrder: [],
    // tableBatchFetchOptions: {},
    // tableColumnsToSort: undefined,
    // tableSearch: undefined,
    // totalNumberOfRecords: 0,
    // treeBaseItems: [],
    treeEnabled: false,
    treeItemFetchOptions: {
      include: [],
      relationships: ['children', 'parent'],
    },
  }

  class ResourceManagerWrapper extends Component {
    constructor(props) {
      super(props)

      this.getNestedCacheNamespaces = this.getNestedCacheNamespaces.bind(this)
      this.selectCurrentRow = this.selectCurrentRow.bind(this)

      this.shortcuts = [
        {
          command: 'n t',
          description: 'Open table view',
          onPress: event => {
            event.preventDefault()
            props.navigateTable()
          },
        },
      ]
      if (!props.isPicker) {
        // picker case is handled in picker action bar
        this.shortcuts.push({
          command: 'space',
          description: 'Select current item',
          onPress: event => {
            event.preventDefault()
            this.selectCurrentRow()
          },
        })
        this.shortcuts.push({
          command: 'n n',
          description: 'Open new record form',
          onPress: event => {
            event.preventDefault()
            props.navigateCreate()
          },
        })
      }

      const {
        clearNestedCache,
        focusedItemId,
        initialFilterValues,
        initialItemId,
        navigateFilter,
        isPicker,
        setFocusedItemId,
      } = props

      if (!focusedItemId && initialItemId) {
        setFocusedItemId(initialItemId)
      }

      if (initialFilterValues && isPicker) {
        navigateFilter()
      }

      clearNestedCache({
        namespaces: this.getNestedCacheNamespaces(),
      })
    }

    componentWillUnmount() {
      const { managerScope } = this.props
      this.props.clearNestedCache({
        namespaces: this.getNestedCacheNamespaces(),
      })

      this.props.clearResourceState({ managerScope })
    }

    getNestedCacheNamespaces() {
      const { managerScope } = this.props
      return [
        managerScope,
        `${managerScope}Title`,
        `search${capitalizeFirstLetter(managerScope)}`,
        `search${capitalizeFirstLetter(managerScope)}Title`,
      ]
    }

    selectCurrentRow() {
      const { focusedItemId, navigateEdit } = this.props

      if (focusedItemId) {
        navigateEdit(focusedItemId)
      }
    }

    render() {
      log.render()
      const { managerScope } = this.props

      return (
        <ResourceManagerConfigProvider {...this.props}>
          <KeyboardShortcuts
            activeInLayer={managerScope}
            shortcuts={this.shortcuts}
          />
          <ComposedComponent {...this.props} />
        </ResourceManagerConfigProvider>
      )
    }
  }

  ResourceManagerWrapper.propTypes = propTypes
  ResourceManagerWrapper.defaultProps = defaultProps

  return compose(
    createGetResourceCount(),
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    injectFocusedItemId,
    connect(),
    createShortcutLayer({ layer: 'resourceManager' })
  )(ResourceManagerWrapper)
}

export default createResourceManagerWrapper
