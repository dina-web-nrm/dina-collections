import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { RowLayout } from 'coreModules/layout/components'
import { pick } from 'lodash'

import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import { emToPixels } from 'coreModules/layout/utilities'
import { getTableWidth } from 'coreModules/resourceManager/utilities'

import RecordNavigationBar from './shared/RecordNavigationBar'
import ResultOptionsBar from './shared/ResultOptionsBar'
import TableSettings from './collection/TableSettings'
import TableView from './collection/TableView'
import TreeView from './collection/TreeView'
import CreateItemColumn from './item/CreateItemColumn'
import EditItemColumn from './item/EditItemColumn'

const recordOptionsBarRowStyle = {
  paddingLeft: '1rem',
  paddingRight: '1rem',
}
const overflowAuto = { overflow: 'auto' }

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  createGetNestedItemHocInput: PropTypes.object,
  createItemActive: PropTypes.bool.isRequired,
  editItemActive: PropTypes.bool.isRequired,
  isPicker: PropTypes.bool.isRequired,
  itemFetchOptions: PropTypes.object.isRequired,
  onInteraction: PropTypes.func.isRequired,
  onOpenNewRecordForm: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  recordNavigationHeight: PropTypes.number,
  recordOptionsHeight: PropTypes.number,
  tableActive: PropTypes.bool.isRequired,
  tableColumnSpecifications: PropTypes.array.isRequired,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired),
  tableSettingsActive: PropTypes.bool.isRequired,
  treeActive: PropTypes.bool.isRequired,
}

const defaultProps = {
  createGetNestedItemHocInput: {},
  onOpenNewRecordForm: undefined,
  recordNavigationHeight: emToPixels(4.25),
  recordOptionsHeight: emToPixels(3.5625),
  tableColumnsToShow: undefined,
}

const MainColumn = props => {
  const {
    availableHeight,
    createGetNestedItemHocInput,
    createItemActive,
    editItemActive,
    isPicker,
    itemFetchOptions,
    onOpenNewRecordForm,
    recordNavigationHeight,
    recordOptionsHeight,
    tableActive,
    tableSettingsActive,
    tableColumnsToShow,
    tableColumnSpecifications,
    treeActive,
  } = props

  return (
    <RowLayout availableHeight={availableHeight}>
      {!isPicker && (
        <RowLayout.Row height={`${recordNavigationHeight}px`}>
          <RecordNavigationBar
            {...pick(props, [
              'createItemActive',
              'currentTableRowNumber',
              'numberOfListItems',
              'onSelectNextRecord',
              'onSelectPreviousRecord',
              'onSetCurrentTableRowNumber',
              'onShowAllRecords',
              'totalNumberOfRecords',
              'treeActive',
            ])}
            disabled={treeActive || createItemActive}
            onOpenNewRecordForm={
              createItemActive ? undefined : onOpenNewRecordForm
            }
          />
        </RowLayout.Row>
      )}
      <RowLayout.Row
        height={`${recordOptionsHeight}px`}
        style={recordOptionsBarRowStyle}
      >
        <ResultOptionsBar
          {...pick(props, [
            'createItemActive',
            'csvExportEnabled',
            'editItemActive',
            'itemEnabled',
            'onFormTabClick',
            'onTableTabClick',
            'onTableSettingsClick',
            'onTreeTabClick',
            'onToggleFilters',
            'resource',
            'tableActive',
            'tableColumnSpecifications',
            'treeActive',
          ])}
        />
      </RowLayout.Row>
      {tableActive && (
        <RowLayout.Row style={overflowAuto}>
          <TableView
            {...pick(props, [
              'currentTableRowNumber',
              'enableTableColumnSorting',
              'focusedIndex',
              'focusedItemId',
              'listItems',
              'managerScope',
              'onClickRow',
              'onFormTabClick',
              'onSelectNextRecord',
              'onSelectPreviousRecord',
              'resource',
              'tableBatchFetchOptions',
              'tableColumnSpecifications',
              'tableSearch',
            ])}
            availableHeight={
              availableHeight - recordNavigationHeight - recordOptionsHeight
            }
            width={getTableWidth({
              includeColumns: tableColumnsToShow,
              tableColumnSpecifications,
            })}
          />
        </RowLayout.Row>
      )}
      {tableSettingsActive && (
        <RowLayout.Row style={overflowAuto}>
          <TableSettings
            {...pick(props, [
              'onTableTabClick',
              'resource',
              'tableColumnSpecifications',
            ])}
          />
        </RowLayout.Row>
      )}
      {treeActive && (
        <RowLayout.Row style={overflowAuto}>
          <TreeView
            {...pick(props, [
              'baseItems',
              'currentTableRowNumber',
              'expandedIds',
              'fetchTreeBase',
              'focusedIndex',
              'itemFetchOptions',
              'ItemTitle',
              'listItems',
              'managerScope',
              'onClickRow',
              'onToggleRow',
              'resource',
              'setBaseItems',
              'setFocusedIndex',
              'setListItems',
              'showAll',
            ])}
            {...itemFetchOptions}
          />
        </RowLayout.Row>
      )}
      {createItemActive && (
        <RowLayout.Row style={overflowAuto}>
          <CreateItemColumn
            {...pick(props, [
              'onInteraction',
              'filterResourceCount',
              'resource',
              'renderCreateForm',
              'sectionId',
              'transformOutput',
            ])}
            availableHeight={
              availableHeight - recordNavigationHeight - recordOptionsHeight
            }
          />
        </RowLayout.Row>
      )}
      {editItemActive && (
        <RowLayout.Row style={overflowAuto}>
          <EditItemColumn
            {...createGetNestedItemHocInput}
            {...pick(props, [
              'buildEditItemHeaders',
              'fetchRelationshipsBeforeDelete',
              'filterResourceCount',
              'itemId',
              'ItemTitle',
              'onInteraction',
              'relationshipsToCheckBeforeDelete',
              'renderEditForm',
              'resource',
              'itemFetchOptions',
              'sectionId',
              'transformOutput',
            ])}
            availableHeight={
              availableHeight - recordNavigationHeight - recordOptionsHeight
            }
          />
        </RowLayout.Row>
      )}
    </RowLayout>
  )
}

MainColumn.defaultProps = defaultProps
MainColumn.propTypes = propTypes

export default compose(injectWindowHeight)(MainColumn)
