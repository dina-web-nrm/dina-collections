import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import memoize from 'memoize-one'
import {
  ColumnLayout,
  InformationSidebar,
  RowLayout,
} from 'coreModules/layout/components'
import { createResourceManagerWrapper } from 'coreModules/resourceManager/higherOrderComponents'
import layoutSelectors from 'coreModules/layout/globalSelectors'
import { emToPixels } from 'coreModules/layout/utilities'
import extractProps from 'utilities/extractProps'

import MainColumn from './MainColumn'
import FilterColumn from './FilterColumn'
import PickerHeader from './picker/Header'
import PickerActionBar from './picker/ActionBar'

const TOP_NAVBAR_HEIGHT = emToPixels(3.4375)
const PICKER_MODAL_PADDING = emToPixels(10)
const PICKER_HEADER_HEIGHT = emToPixels(3.5)
const PICKER_ACTION_BAR_HEIGHT = emToPixels(5)

const mapStateToProps = (state, { isPicker, windowHeight }) => {
  const availableHeight = isPicker
    ? windowHeight - PICKER_MODAL_PADDING
    : windowHeight - TOP_NAVBAR_HEIGHT

  const columnHeight = isPicker
    ? availableHeight - PICKER_HEADER_HEIGHT - PICKER_ACTION_BAR_HEIGHT
    : availableHeight

  return {
    availableHeight,
    columnHeight,
    filterColumnWidth: isPicker ? emToPixels(16) : emToPixels(25),
    rightSidebarIsOpen: layoutSelectors.getRightSidebarIsOpen(state),
  }
}

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  columnHeight: PropTypes.number.isRequired,
  createItemActive: PropTypes.bool.isRequired,
  editItemActive: PropTypes.bool.isRequired,
  fetchRelationshipsBeforeDelete: PropTypes.func,
  filterActive: PropTypes.bool.isRequired,
  filterColumnWidth: PropTypes.number.isRequired,
  focusedItemId: PropTypes.string,
  isPicker: PropTypes.bool,
  itemFetchOptions: PropTypes.object.isRequired,
  itemId: PropTypes.string,
  managerScope: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  relationshipsToCheckBeforeDelete: PropTypes.arrayOf(PropTypes.string),
  renderEditForm: PropTypes.func.isRequired,
  renderFilterForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  rightSidebarIsOpen: PropTypes.bool.isRequired,
  rightSidebarWidth: PropTypes.number,
  tableActive: PropTypes.bool.isRequired,
  tableColumnSpecifications: PropTypes.array.isRequired,
  transformOutput: PropTypes.func,
  treeActive: PropTypes.bool.isRequired,
  treeEnabled: PropTypes.bool.isRequired,
  windowHeight: PropTypes.number.isRequired,
}
const defaultProps = {
  fetchRelationshipsBeforeDelete: undefined,
  focusedItemId: undefined,
  isPicker: false,
  itemId: undefined,
  relationshipsToCheckBeforeDelete: undefined,
  rightSidebarWidth: emToPixels(25),
  transformOutput: undefined,
}

class ResourceManager extends Component {
  constructor(props) {
    super(props)

    this.getColumns = this.getColumns.bind(this)
    this.renderColumn = this.renderColumn.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  getColumns = memoize(
    (
      createItemActive,
      editItemActive,
      filterColumnWidth,
      filterActive,
      rightSidebarIsOpen,
      rightSidebarWidth
    ) => {
      const columns = [
        {
          key: 'mainColumn',
        },
      ]

      const filterColumnStyle = {
        background: 'white',
        borderLeft: '1px solid #D4D4D5',
        zIndex: 100,
      }

      if (filterActive) {
        columns.push({
          key: 'filterColumn',
          style: filterColumnStyle,
          width: `${filterColumnWidth}px`,
        })
      }

      if (rightSidebarIsOpen) {
        columns.push({
          key: 'rightSidebar',
          style: filterColumnStyle,
          width: `${rightSidebarWidth}px`,
        })
      }
      return columns
    }
  )

  getRows = memoize(isPicker => {
    return isPicker
      ? [
          { height: `${PICKER_HEADER_HEIGHT}px`, key: 'pickerHeader' },
          { key: 'main' },
          { height: `${PICKER_ACTION_BAR_HEIGHT}px`, key: 'pickerActionBar' },
        ]
      : [{ key: 'main' }]
  })

  renderColumn(key) {
    switch (key) {
      case 'mainColumn': {
        const { extractedProps } = extractProps({
          keys: [
            'availableHeight',
            'baseItems',
            'buildEditItemHeaders',
            'createGetNestedItemHocInput',
            'createItemActive',
            'currentTableRowNumber',
            'editItemActive',
            'expandedIds',
            'fetchRelationshipsBeforeDelete',
            'fetchTreeBase',
            'filterActive',
            'focusedIndex',
            'isPicker',
            'itemEnabled',
            'itemFetchOptions',
            'itemId',
            'ItemTitle',
            'listItems',
            'managerScope',
            'nextRowAvailable',
            'numberOfListItems',
            'onClickRow',
            'onFormTabClick',
            'onInteraction',
            'onOpenNewRecordForm',
            'onSelectNextRecord',
            'onSelectPreviousRecord',
            'onSetCurrentTableRowNumber',
            'onShowAllRecords',
            'onToggleCurrentRow',
            'onToggleFilters',
            'onToggleRow',
            'prevRowAvailable',
            'relationshipsToCheckBeforeDelete',
            'renderCreateForm',
            'renderEditForm',
            'resource',
            'setListItems',
            'showAll',
            'tableActive',
            'tableBatchFetchOptions',
            'tableColumnSpecifications',
            'tableSearch',
            'totalNumberOfRecords',
            'treeActive',
            'treeEnabled',
          ],
          props: this.props,
        })

        const { columnHeight, transformOutput } = this.props
        return (
          <MainColumn
            {...extractedProps}
            availableHeight={columnHeight}
            transformOutput={transformOutput}
          />
        )
      }

      case 'filterColumn': {
        const { extractedProps } = extractProps({
          keys: [
            'buildFilterQuery',
            'filterHeader',
            'filterValues',
            'isPicker',
            'onInteraction',
            'onShowAllRecords',
            'onUpdateFilterValues',
            'renderFilterForm',
            'resource',
          ],
          props: this.props,
        })
        const { columnHeight } = this.props
        return (
          <FilterColumn {...extractedProps} availableHeight={columnHeight} />
        )
      }

      case 'rightSidebar': {
        return <InformationSidebar />
      }

      default: {
        throw new Error(`Unknown column: ${key}`)
      }
    }
  }

  renderRow(key) {
    switch (key) {
      case 'main': {
        const {
          createItemActive,
          editItemActive,
          filterColumnWidth,
          filterActive,
          rightSidebarIsOpen,
          rightSidebarWidth,
        } = this.props
        const columns = this.getColumns(
          createItemActive,
          editItemActive,
          filterColumnWidth,
          filterActive,
          rightSidebarIsOpen,
          rightSidebarWidth
        )
        return (
          <ColumnLayout
            {...this.props}
            columns={columns}
            renderColumn={this.renderColumn}
          />
        )
      }

      case 'pickerHeader': {
        const { extractedProps } = extractProps({
          keys: ['onClosePicker', 'pickerTitle'],
          props: this.props,
        })

        return <PickerHeader {...extractedProps} />
      }

      case 'pickerActionBar': {
        const { extractedProps } = extractProps({
          keys: [
            'excludeRootNode',
            'ItemTitle',
            'managerScope',
            'onPickItem',
            'resource',
          ],
          props: this.props,
        })

        const { managerScope, itemFetchOptions } = this.props

        return (
          <PickerActionBar
            {...extractedProps}
            {...itemFetchOptions}
            itemId={this.props.focusedItemId}
            namespace={`${managerScope}Title`}
          />
        )
      }

      default: {
        throw new Error(`Unknown row: ${key}`)
      }
    }
  }

  render() {
    const { isPicker } = this.props
    const rows = this.getRows(isPicker)

    return <RowLayout {...this.props} renderRow={this.renderRow} rows={rows} />
  }
}

ResourceManager.propTypes = propTypes
ResourceManager.defaultProps = defaultProps

export default compose(
  createResourceManagerWrapper(),
  injectWindowHeight,
  connect(mapStateToProps)
)(ResourceManager)
