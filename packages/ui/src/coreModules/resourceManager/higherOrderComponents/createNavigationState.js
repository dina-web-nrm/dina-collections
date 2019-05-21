/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ResourceManagerNavigationProvider } from '../contexts/resourceManagerNavigation'
import {
  CLOSE_FILTER,
  CLOSE_ITEM_VIEW,
  CREATE_SUCCESS,
  CREATE_CANCEL,
  DEL_SUCCESS,
  ITEM_SELECT,
  NAVIGATE_CREATE,
  NAVIGATE_FILTER,
  NAVIGATE_FORM_SECTION,
  NAVIGATE_TABLE,
  NAVIGATE_TABLE_SETTINGS,
  NAVIGATE_TREE,
} from '../constants'

const createResourceUrlState = () => ComposedComponent => {
  const propTypes = {
    clearState: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    isPicker: PropTypes.bool,
    onInteraction: PropTypes.func,
    state: PropTypes.object.isRequired,
    treeEnabled: PropTypes.bool,
    updateState: PropTypes.func.isRequired,
  }

  const defaultProps = {
    isPicker: false,
    onInteraction: undefined,
    treeEnabled: false,
  }

  class NavigationState extends Component {
    constructor(props) {
      super(props)
      this.closeFilter = this.closeFilter.bind(this)
      this.closeItemView = this.closeItemView.bind(this)
      this.handleNavigation = this.handleNavigation.bind(this)
      this.navigateCreate = this.navigateCreate.bind(this)
      this.navigateEdit = this.navigateEdit.bind(this)
      this.navigateFormSection = this.navigateFormSection.bind(this)
      this.navigateTable = this.navigateTable.bind(this)
      this.navigateTableSettings = this.navigateTableSettings.bind(this)
      this.navigateTree = this.navigateTree.bind(this)
      this.toggleFilter = this.toggleFilter.bind(this)
    }

    handleNavigation(type, data = {}) {
      switch (type) {
        case CLOSE_FILTER: {
          this.closeFilter()
          break
        }
        case CLOSE_ITEM_VIEW: {
          this.closeItemView()
          break
        }
        case CREATE_SUCCESS: {
          const { itemId } = data
          this.navigateEdit(itemId)
          break
        }
        case CREATE_CANCEL: {
          if (this.props.goBack) {
            this.props.goBack()
          } else {
            this.navigateTable({
              disablePrompt: true,
            })
          }
          break
        }
        case DEL_SUCCESS: {
          this.navigateTable()
          break
        }
        case ITEM_SELECT: {
          const { itemId } = data
          this.navigateEdit(itemId)
          break
        }
        case NAVIGATE_CREATE: {
          this.navigateCreate()
          break
        }
        case NAVIGATE_TABLE: {
          this.navigateTable()
          break
        }
        case NAVIGATE_TABLE_SETTINGS: {
          this.navigateTableSettings()
          break
        }
        case NAVIGATE_FILTER: {
          this.navigateFilter()
          break
        }
        case NAVIGATE_TREE: {
          this.navigateTree()
          break
        }
        case NAVIGATE_FORM_SECTION: {
          const { sectionId } = data
          this.navigateFormSection(sectionId)
          break
        }
        default: {
          break
        }
      }

      if (this.props.onInteraction) {
        this.props.onInteraction(type, data)
      }
    }

    closeFilter() {
      this.props.updateState({
        filterColumn: undefined,
      })
    }

    closeItemView() {
      this.props.clearState(['filterColumn'])
    }

    navigateEdit(itemId) {
      this.props.updateState({
        filterColumn: undefined,
        itemId,
        mainColumn: 'edit',
        sectionId: this.props.state.sectionId || '0',
      })
    }

    navigateFilter() {
      this.props.updateState({
        filterColumn: 'filter',
        mainColumn: 'table',
      })
    }

    navigateFormSection(sectionId) {
      this.props.updateState({
        sectionId,
      })
    }

    navigateCreate() {
      this.props.updateState({
        filterColumn: undefined,
        itemId: undefined,
        mainColumn: 'create',
        sectionId: this.props.state.sectionId || '0',
      })
    }

    navigateTable(state) {
      this.props.updateState(
        {
          itemId: undefined,
          mainColumn: 'table',
          sectionId: undefined,
        },
        state
      )
    }

    navigateTableSettings(state) {
      this.props.updateState(
        {
          itemId: undefined,
          mainColumn: 'tableSettings',
          sectionId: undefined,
        },
        state
      )
    }

    navigateTree() {
      this.props.updateState({
        filterColumn: undefined,
        itemId: undefined,
        mainColumn: 'tree',
        sectionId: undefined,
      })
    }

    toggleFilter() {
      const {
        state: { filterColumn },
      } = this.props

      const filterActive = filterColumn === 'filter'

      if (filterActive) {
        this.closeFilter()
      } else {
        this.navigateFilter()
      }
    }

    render() {
      const { state, treeEnabled, isPicker } = this.props

      const {
        mainColumn = treeEnabled ? 'tree' : 'table',
        filterColumn,
        itemId,
        sectionId,
      } = state

      const navigationProps = {
        closeFilter: this.closeFilter,
        createItemActive: !isPicker && mainColumn === 'create',
        editItemActive: !isPicker && mainColumn === 'edit',
        filterActive: filterColumn === 'filter',
        itemId,
        navigateCreate: this.navigateCreate,
        navigateEdit: this.navigateEdit,
        navigateFilter: this.navigateFilter,
        navigateFormSection: this.navigateFormSection,
        navigateRoot: this.navigateRoot,
        navigateTable: this.navigateTable,
        navigateTableSettings: this.navigateTableSettings,
        navigateTree: this.navigateTree,
        onNavigation: this.handleNavigation,
        sectionId,
        tableActive: mainColumn === 'table',
        tableSettingsActive: mainColumn === 'tableSettings',
        toggleFilter: this.toggleFilter,
        treeActive: mainColumn === 'tree',
        treeEnabled,
      }

      return (
        <ResourceManagerNavigationProvider {...navigationProps}>
          <ComposedComponent {...this.props} {...navigationProps} />
        </ResourceManagerNavigationProvider>
      )
    }
  }

  NavigationState.propTypes = propTypes
  NavigationState.defaultProps = defaultProps

  return NavigationState
}

export default createResourceUrlState
