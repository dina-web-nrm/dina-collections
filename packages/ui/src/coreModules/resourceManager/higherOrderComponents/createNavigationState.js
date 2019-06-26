import React, { Component } from 'react'
import PropTypes from 'prop-types'

const createResourceUrlState = () => ComposedComponent => {
  const propTypes = {
    clearState: PropTypes.func.isRequired,
    goBack: PropTypes.func,
    isPicker: PropTypes.bool,
    state: PropTypes.object.isRequired,
    treeEnabled: PropTypes.bool,
    updateState: PropTypes.func.isRequired,
  }

  const defaultProps = {
    goBack: undefined,
    isPicker: false,
    treeEnabled: false,
  }

  class NavigationState extends Component {
    constructor(props) {
      super(props)
      this.cancelCreate = this.cancelCreate.bind(this)
      this.closeFilter = this.closeFilter.bind(this)
      this.closeItemView = this.closeItemView.bind(this)
      this.navigateCreate = this.navigateCreate.bind(this)
      this.navigateEdit = this.navigateEdit.bind(this)
      this.navigateFilter = this.navigateFilter.bind(this)
      this.navigateFormSection = this.navigateFormSection.bind(this)
      this.navigateTable = this.navigateTable.bind(this)
      this.navigateTableSettings = this.navigateTableSettings.bind(this)
      this.navigateTree = this.navigateTree.bind(this)
      this.toggleFilter = this.toggleFilter.bind(this)
    }

    cancelCreate() {
      if (this.props.goBack) {
        this.props.goBack()
      } else {
        this.navigateTable({
          disablePrompt: true,
        })
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
        itemId: undefined,
        mainColumn: 'table',
        sectionId: undefined,
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
        sectionId: '0',
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

      return (
        <ComposedComponent
          {...this.props}
          cancelCreate={this.cancelCreate}
          closeFilter={this.closeFilter}
          createItemActive={!isPicker && mainColumn === 'create'}
          editItemActive={!isPicker && mainColumn === 'edit'}
          filterActive={filterColumn === 'filter'}
          itemId={itemId}
          navigateCreate={this.navigateCreate}
          navigateEdit={this.navigateEdit}
          navigateFilter={this.navigateFilter}
          navigateFormSection={this.navigateFormSection}
          navigateTable={this.navigateTable}
          navigateTableSettings={this.navigateTableSettings}
          navigateTree={this.navigateTree}
          sectionId={sectionId}
          tableActive={mainColumn === 'table'}
          tableSettingsActive={mainColumn === 'tableSettings'}
          toggleFilter={this.toggleFilter}
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
