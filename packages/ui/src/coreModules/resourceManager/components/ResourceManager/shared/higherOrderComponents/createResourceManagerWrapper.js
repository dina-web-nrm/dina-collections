/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { destroy } from 'redux-form'

import createLog from 'utilities/log'
import capitalizeFirstLetter from 'common/src/stringFormatters/capitalizeFirstLetter'
import { actionCreators as keyObjectActionCreators } from 'coreModules/resourceManager/keyObjectModule'
import { createGetResourceCount } from 'coreModules/crud/higherOrderComponents'
import { createShortcutLayer } from 'coreModules/keyboardShortcuts/higherOrderComponents'
import { emToPixels } from 'coreModules/layout/utilities'
import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'
import crudActionCreators from 'coreModules/crud/actionCreators'
import layoutSelectors from 'coreModules/layout/globalSelectors'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'

import { ResourceManagerConfigProvider } from '../contexts/resourceManagerConfig'
import { ResourceManagerNavigationProvider } from '../contexts/resourceManagerNavigation'
import injectFocusedItemId from './injectFocusedItemId'

const log = createLog('resourceManager:createResourceManagerWrapper')

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
  const mapStateToProps = (state, { isPicker, resource }) => {
    const managerScope = isPicker ? `${resource}Picker` : resource
    const searchResource = `search${capitalizeFirstLetter(resource)}`

    return {
      filterColumnWidth: isPicker ? emToPixels(16) : emToPixels(25),
      filterFormName: `${searchResource}Filter`,
      layer: managerScope,
      managerScope,
      rightSidebarIsOpen: layoutSelectors.getRightSidebarIsOpen(state),
      searchResource,
    }
  }

  const mapDispatchToProps = {
    clearNestedCache: crudActionCreators.clearNestedCache,
    clearResourceState: keyObjectActionCreators.del[':managerScope'],
    destroyForm: destroy,
  }

  const propTypes = {
    baseTreeFilter: PropTypes.object,
    buildEditItemHeaders: PropTypes.func,
    buildFilterQuery: PropTypes.func.isRequired,
    clearNestedCache: PropTypes.func.isRequired,
    clearResourceState: PropTypes.func.isRequired,
    createGetNestedItemHocInput: PropTypes.object.isRequired,
    destroyForm: PropTypes.func.isRequired,
    enableTableColumnSorting: PropTypes.bool,
    excludeRootNode: PropTypes.bool,
    filterFormName: PropTypes.string.isRequired,
    focusedItemId: PropTypes.string,
    initialFilterValues: PropTypes.object,
    initialItemId: PropTypes.string,
    isPicker: PropTypes.bool,
    itemId: PropTypes.string,
    ItemTitle: PropTypes.func,
    managerScope: PropTypes.string.isRequired,
    navigateCreate: PropTypes.func.isRequired,
    navigateEdit: PropTypes.func.isRequired,
    navigateFilter: PropTypes.func.isRequired,
    navigateTable: PropTypes.func.isRequired,
    navigateTree: PropTypes.func.isRequired,
    relationshipsToCheckBeforeDelete: PropTypes.array,
    renderCreateForm: PropTypes.func.isRequired,
    renderEditForm: PropTypes.func.isRequired,
    renderFilterForm: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
    rightSidebarWidth: PropTypes.number,
    searchResource: PropTypes.string.isRequired,
    setFocusedItemId: PropTypes.func.isRequired,
    sortOrder: PropTypes.array,
    tableBatchFetchOptions: PropTypes.object,
    tableColumnSpecifications: PropTypes.array.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    transformOutput: PropTypes.func,
    treeEnabled: PropTypes.bool,
    treeItemFetchOptions: PropTypes.object,
    windowHeight: PropTypes.number.isRequired,
  }

  const defaultProps = {
    baseTreeFilter: {},
    buildEditItemHeaders: defaultBuildEditItemHeaders,
    enableTableColumnSorting: false,
    excludeRootNode: false,
    focusedItemId: undefined,
    initialFilterValues: undefined,
    initialItemId: undefined,
    isPicker: false,
    itemId: undefined,
    ItemTitle: undefined,
    relationshipsToCheckBeforeDelete: [],
    rightSidebarWidth: emToPixels(25),
    sortOrder: [],
    tableBatchFetchOptions: {},
    transformOutput: values => values,
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
          command: 'f',
          description: 'Show/hide filters',
          onPress: event => {
            event.preventDefault()
            props.toggleFilter()
          },
        },
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
        itemId,
        navigateFilter,
        navigateTree,
        isPicker,
        setFocusedItemId,
        treeEnabled,
      } = props

      if (isPicker && initialFilterValues) {
        navigateFilter()
      }

      if (!focusedItemId && (itemId || initialItemId)) {
        const newFocusedItemId = itemId || initialItemId
        setFocusedItemId(newFocusedItemId)

        if (isPicker && newFocusedItemId === initialItemId && treeEnabled) {
          navigateTree()
        }
      }

      clearNestedCache({
        namespaces: this.getNestedCacheNamespaces(),
      })
    }

    componentWillUnmount() {
      const { destroyForm, filterFormName, isPicker, managerScope } = this.props

      if (isPicker) {
        destroyForm(filterFormName)
      }

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
          <ResourceManagerNavigationProvider {...this.props}>
            <KeyboardShortcuts
              activeInLayer={managerScope}
              shortcuts={this.shortcuts}
            />
            <ComposedComponent {...this.props} />
          </ResourceManagerNavigationProvider>
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
    injectWindowHeight,
    injectFocusedItemId,
    createShortcutLayer({ layer: 'resourceManager' })
  )(ResourceManagerWrapper)
}

export default createResourceManagerWrapper
