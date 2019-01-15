/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  CLOSE_ITEM_VIEW,
  CREATE_SUCCESS,
  DEL_SUCCESS,
  ITEM_SELECT,
  NAVIGATE_CREATE,
  NAVIGATE_FILTER,
  NAVIGATE_LIST,
  NAVIGATE_ROOT,
  NAVIGATE_TREE,
} from '../constants'

const createResourceUrlState = () => ComposedComponent => {
  const propTypes = {
    clearState: PropTypes.func.isRequired,
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
      this.navigateCreate = this.navigateCreate.bind(this)
      this.navigateEdit = this.navigateEdit.bind(this)
      this.navigateList = this.navigateList.bind(this)
      this.navigateRoot = this.navigateRoot.bind(this)
      this.navigateTree = this.navigateTree.bind(this)
      this.handleNavigation = this.handleNavigation.bind(this)
      this.closeItemView = this.closeItemView.bind(this)
    }

    handleNavigation(type, data = {}) {
      switch (type) {
        case ITEM_SELECT: {
          const { itemId } = data
          console.log('ITEM_SELECT', itemId)
          this.navigateEdit(itemId)
          break
        }
        case NAVIGATE_CREATE: {
          this.navigateCreate()
          break
        }
        case NAVIGATE_ROOT: {
          this.navigateRoot()
          break
        }

        case CLOSE_ITEM_VIEW: {
          this.closeItemView()
          break
        }

        case NAVIGATE_LIST: {
          this.navigateList()
          break
        }

        case NAVIGATE_TREE: {
          this.navigateTree()
          break
        }

        case NAVIGATE_FILTER: {
          this.navigateFilter()
          break
        }

        case CREATE_SUCCESS: {
          const { itemId } = data
          console.log('CREATE_SUCCESS', itemId)
          this.navigateEdit(itemId)
          break
        }

        case DEL_SUCCESS: {
          this.navigateList()
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

    closeItemView() {
      this.props.clearState(['filterColumn'])
    }

    navigateEdit(itemId) {
      console.log('navigateEdit', itemId)
      this.props.updateState({
        itemId,
        mainColumn: 'edit',
      })
    }

    navigateFilter() {
      console.log('navigateFilter')
      this.props.updateState({
        filterColumn: 'filter',
      })
    }

    navigateCreate() {
      console.log('navigateCreate')
      this.props.updateState({
        filterColumn: '',
        mainColumn: 'create',
      })
    }

    navigateRoot() {
      console.log('navigateRoot')
      this.props.clearState()
    }

    navigateList() {
      console.log('navigateList')
      this.props.updateState({
        mainColumn: 'table',
      })
    }

    navigateTree() {
      console.log('navigateTree')
      this.props.updateState({
        filterColumn: '',
        mainColumn: 'tree',
      })
    }

    render() {
      const { state, treeEnabled, isPicker } = this.props

      const {
        mainColumn = treeEnabled ? 'tree' : 'table',
        filterColumn,
        itemId,
      } = state

      return (
        <ComposedComponent
          {...this.props}
          createItemActive={!isPicker && mainColumn === 'create'}
          editItemActive={!isPicker && mainColumn === 'edit'}
          filterActive={filterColumn === 'filter'}
          itemEnabled={!isPicker}
          itemId={itemId}
          navigateCreate={this.navigateCreate}
          navigateEdit={this.navigateEdit}
          navigateRoot={this.navigateRoot}
          onNavigation={this.handleNavigation}
          tableActive={mainColumn === 'table'}
          treeActive={mainColumn === 'tree'}
          treeEnabled={treeEnabled}
        />
      )
    }
  }

  NavigationState.propTypes = propTypes
  NavigationState.defaultProps = defaultProps

  return NavigationState
}

export default createResourceUrlState
