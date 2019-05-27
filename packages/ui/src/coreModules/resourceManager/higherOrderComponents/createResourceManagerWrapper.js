/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import createLog from 'utilities/log'
import capitalizeFirstLetter from 'common/src/stringFormatters/capitalizeFirstLetter'
import { actionCreators as keyObjectActionCreators } from 'coreModules/resourceManager/keyObjectModule'
import { createGetResourceCount } from 'coreModules/crud/higherOrderComponents'
import { createShortcutLayer } from 'coreModules/keyboardShortcuts/higherOrderComponents'
import { injectFocusedItemId } from 'coreModules/resourceManager/higherOrderComponents'
import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'
import { ResourceManagerConfigProvider } from 'coreModules/resourceManager/contexts/resourceManagerConfig'
import crudActionCreators from 'coreModules/crud/actionCreators'

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
    const searchResource = `search${capitalizeFirstLetter(resource)}`
    const managerScope = isPicker ? `${resource}Picker` : resource

    return {
      layer: managerScope,
      managerScope,
      searchResource,
    }
  }

  const mapDispatchToProps = {
    clearNestedCache: crudActionCreators.clearNestedCache,
    clearResourceState: keyObjectActionCreators.del[':managerScope'],
  }

  const propTypes = {
    baseTreeFilter: PropTypes.object,
    buildEditItemHeaders: PropTypes.func,
    buildFilterQuery: PropTypes.func.isRequired,
    clearNestedCache: PropTypes.func.isRequired,
    clearResourceState: PropTypes.func.isRequired,
    createGetNestedItemHocInput: PropTypes.object.isRequired,
    enableTableColumnSorting: PropTypes.bool,
    excludeRootNode: PropTypes.bool,
    focusedItemId: PropTypes.string,
    initialFilterValues: PropTypes.object,
    initialItemId: PropTypes.string,
    isPicker: PropTypes.bool,
    itemId: PropTypes.string,
    managerScope: PropTypes.string.isRequired,
    navigateCreate: PropTypes.func.isRequired,
    navigateEdit: PropTypes.func.isRequired,
    navigateFilter: PropTypes.func.isRequired,
    navigateTable: PropTypes.func.isRequired,
    onInteraction: PropTypes.func.isRequired,
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
    enableTableColumnSorting: false,
    excludeRootNode: false,
    focusedItemId: undefined,
    initialFilterValues: {},
    initialItemId: undefined,
    isPicker: false,
    itemId: undefined,
    sortOrder: [],
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
        itemId,
        navigateFilter,
        isPicker,
        setFocusedItemId,
      } = props

      if (!focusedItemId && (itemId || initialItemId)) {
        setFocusedItemId(itemId || initialItemId)
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
