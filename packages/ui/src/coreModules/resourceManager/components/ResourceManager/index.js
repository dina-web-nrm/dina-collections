import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import { pick } from 'lodash'
import memoize from 'memoize-one'

import {
  ColumnLayout,
  InformationSidebar,
  RowLayout,
} from 'coreModules/layout/components'
import { createResourceManagerWrapper } from 'coreModules/resourceManager/higherOrderComponents'
import layoutSelectors from 'coreModules/layout/globalSelectors'
import { emToPixels } from 'coreModules/layout/utilities'
import userSelectors from 'coreModules/user/globalSelectors'
import extractProps from 'utilities/extractProps'

import MainColumn from './MainColumn'
import FilterColumn from './FilterColumn'
import PickerHeader from './picker/Header'
import PickerActionBar from './picker/ActionBar'

const TOP_NAVBAR_HEIGHT = emToPixels(3.4375)
const PICKER_MODAL_PADDING = emToPixels(10)
const PICKER_HEADER_HEIGHT = emToPixels(3.5)
const PICKER_ACTION_BAR_HEIGHT = emToPixels(5)

const getColumns = memoize(
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

const mapStateToProps = (state, { isPicker, resource, windowHeight }) => {
  const availableHeight = isPicker
    ? windowHeight - PICKER_MODAL_PADDING
    : windowHeight - TOP_NAVBAR_HEIGHT

  const columnHeight = isPicker
    ? availableHeight - PICKER_HEADER_HEIGHT - PICKER_ACTION_BAR_HEIGHT
    : availableHeight

  const userPreferences = userSelectors.getUserPreferences(state)

  return {
    availableHeight,
    columnHeight,
    filterColumnWidth: isPicker ? emToPixels(16) : emToPixels(25),
    rightSidebarIsOpen: layoutSelectors.getRightSidebarIsOpen(state),
    tableColumnsToShow:
      (userPreferences && userPreferences[`${resource}TableColumns`]) ||
      undefined,
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
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired),
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
  tableColumnsToShow: undefined,
  transformOutput: undefined,
}

class ResourceManager extends Component {
  constructor(props) {
    super(props)

    this.renderColumn = this.renderColumn.bind(this)
  }

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
            'csvExportEnabled',
            'currentTableRowNumber',
            'editItemActive',
            'enableTableColumnSorting',
            'expandedIds',
            'fetchRelationshipsBeforeDelete',
            'fetchTreeBase',
            'filterActive',
            'filterResourceCount',
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
            'onTableTabClick',
            'onTableSettingsClick',
            'onToggleCurrentRow',
            'onToggleFilters',
            'onToggleRow',
            'onTreeTabClick',
            'prevRowAvailable',
            'relationshipsToCheckBeforeDelete',
            'renderCreateForm',
            'renderEditForm',
            'resource',
            'sectionId',
            'setListItems',
            'showAll',
            'tableActive',
            'tableBatchFetchOptions',
            'tableColumnSpecifications',
            'tableColumnsToShow',
            'tableSearch',
            'tableSettingsActive',
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
            'tableSearch',
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

  render() {
    const {
      availableHeight,
      createItemActive,
      editItemActive,
      focusedItemId,
      filterActive,
      filterColumnWidth,
      isPicker,
      itemFetchOptions,
      managerScope,
      rightSidebarIsOpen,
      rightSidebarWidth,
    } = this.props

    const columns = getColumns(
      createItemActive,
      editItemActive,
      filterColumnWidth,
      filterActive,
      rightSidebarIsOpen,
      rightSidebarWidth
    )

    return (
      <RowLayout availableHeight={availableHeight}>
        {isPicker && (
          <RowLayout.Row height={`${PICKER_HEADER_HEIGHT}px`}>
            <PickerHeader
              {...pick(this.props, ['onClosePicker', 'pickerTitle'])}
            />
          </RowLayout.Row>
        )}
        <RowLayout.Row>
          <ColumnLayout
            {...this.props}
            columns={columns}
            renderColumn={this.renderColumn}
          />
        </RowLayout.Row>
        {isPicker && (
          <RowLayout.Row height={`${PICKER_ACTION_BAR_HEIGHT}px`}>
            <PickerActionBar
              {...pick(this.props, [
                'excludeRootNode',
                'ItemTitle',
                'managerScope',
                'onPickItem',
                'resource',
              ])}
              {...itemFetchOptions}
              itemId={focusedItemId}
              namespace={`${managerScope}Title`}
            />
          </RowLayout.Row>
        )}
      </RowLayout>
    )
  }
}

ResourceManager.propTypes = propTypes
ResourceManager.defaultProps = defaultProps

export default compose(
  createResourceManagerWrapper(),
  injectWindowHeight,
  connect(mapStateToProps)
)(ResourceManager)
